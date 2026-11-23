
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieName = process.env.NODE_ENV =='production'?'__Secure-next-auth.session-token':'next-auth.session-token'

const token = await getToken({ req: request,secret:process.env.AUTH_SECRET,cookieName})
  const isAuthPages = pathname === "/login" || pathname === "/register";

  if (token && isAuthPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedRoutes = ["/profile"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/profile/:path*" ],
};