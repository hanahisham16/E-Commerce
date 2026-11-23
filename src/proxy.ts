// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const token = await getToken({ req: request });
//   const isAuthPages = pathname == "/login" || pathname == "/register";


//   if (token && isAuthPages) {
//     return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/`));
//   }
//   if (!token && !isAuthPages) {
//     return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}login`));
//   }




//   return NextResponse.next();
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: ["/login","/register"],
// };
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
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