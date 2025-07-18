import { NextRequest } from "next/server";
import { authMiddleware } from "@/app/core/auth";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}
