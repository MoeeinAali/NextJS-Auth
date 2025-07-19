import {NextRequest, NextResponse} from "next/server";
import {decryptSession} from "@/app/utils/session";
import {cookies} from "next/headers";
import {setAuthCookieAction} from "@/app/_actions/auth.action";
import {UserResponse} from "@/app/_types/auth.types";

export async function authMiddleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("uranus-session")?.value;

    const authRoutes = ["/signin"];
    const protectedRoutes = ["/dashboard"];
    const signInRoute = request.nextUrl.clone();
    signInRoute.pathname = "/signin";

    const {nextUrl} = request;
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
        const refreshTokenExpired = parsed.sessionExpiry < now - 30 * 1000;

        if (!accessTokenExpired && !refreshTokenExpired && isAuthRoute) {
            const dashboardRoute = request.nextUrl.clone();
            dashboardRoute.pathname = "/dashboard/courses";
            return NextResponse.redirect(dashboardRoute);
        }

        if (refreshTokenExpired) {
            const cookieStore = await cookies()
            cookieStore.delete('uranus-session')
            return NextResponse.redirect(signInRoute)
        }

        if (accessTokenExpired && !refreshTokenExpired) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/api/identity/refresh-token`,
                    {
                        method: "POST",
                        body: JSON.stringify({sessionId: parsed.sessionId}),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                if (response.ok) {
                    const user = await response.json() as unknown as UserResponse;
                    await setAuthCookieAction(user)
                }

            } catch {
                return NextResponse.redirect(signInRoute)
            }
        }


    } catch {
        return NextResponse.redirect(signInRoute);
    }

    return nextResponse;
}
