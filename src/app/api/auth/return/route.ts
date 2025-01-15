import { NextResponse } from "next/server";
import passport from "@/lib/passport";

// Rota de Retorno - Steam redireciona para cá após o login
export async function GET(request: Request) {
    return new Promise((resolve) => {
        passport.authenticate("steam", { session: false })(request, {} as any, (err, user) => {
            if (err || !user) {
                console.error("Erro de autenticação:", err);
                return resolve(NextResponse.redirect(new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_BASE_URL)));
            }

            // Redireciona para o dashboard após login
            return resolve(NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL)));
        });
    });
}
