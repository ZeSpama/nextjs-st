import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (pathname === "/" || pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const steamUser = request.cookies.get("steamUser");
    if (!steamUser) {
        return NextResponse.redirect(new URL("/api/auth/login", process.env.NEXT_PUBLIC_BASE_URL));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|favicon.ico).*)"],
};

