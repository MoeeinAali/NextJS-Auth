import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/app/utils/session";

export async function authMiddleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("uranus-session")?.value;

  const authRoutes = ["/signin"];
  const protectedRoutes = ["/dashboard"];
  const signInRoute = request.nextUrl.clone();
  signInRoute.pathname = "/signin";

  const { nextUrl } = request;
  const nextResponse = NextResponse.next();

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );
  if (!sessionCookie) {
    if (isProtectedRoute) {
      const callback = encodeURIComponent(nextUrl.pathname);
      return NextResponse.redirect(`${signInRoute}?callback=${callback}`);
    } else {
      return nextResponse;
    }
  }
  try {
    const parsed = await decryptSession(JSON.parse(sessionCookie));
    const now = Date.now();

    const accessTokenExpired = parsed.exp < now;
    const refreshTokenExpired = parsed.sessionExpiry < now;

    if (!accessTokenExpired && !refreshTokenExpired && isAuthRoute) {
      const dashboardRoute = request.nextUrl.clone();
      dashboardRoute.pathname = "/dashboard/courses";
      return NextResponse.redirect(dashboardRoute);
    }
  } catch {
    return NextResponse.redirect(`${signInRoute}`);
  }

  return nextResponse;
}
