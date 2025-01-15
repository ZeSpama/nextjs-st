import { NextResponse } from "next/server";

export async function middleware(req: Request) {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/api/auth") || pathname === "/") return NextResponse.next();

    // Exemplo: Redirecionar se o usuário não está autenticado
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, { cache: "no-store" });
    if (res.status === 401) {
        return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api/auth).*)"], // Proteja todas as rotas, exceto APIs públicas
};
