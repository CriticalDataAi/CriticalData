import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export default async function middleware(request: NextRequest) {
  try{
    if (request.url.includes("/login")) {
      return NextResponse.next();
    }

    const token = request.cookies['auth-token'] || "";
    if (token == "" && !request.url.includes("/login")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

  } catch (error: any) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
    // '/((?!_next/static|_next/image|images|favicon.ico).*)',
  ],
}