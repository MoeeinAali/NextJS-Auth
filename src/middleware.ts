import { NextRequest } from "next/server";
import { authMiddleware } from "@/lib/middlewares/auth.middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml|api|static|assets|.*\\..*).*)",
  ],
};
