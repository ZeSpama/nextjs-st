import { NextResponse } from "next/server";
import passport from "@/lib/passport";

export async function GET(request: Request): Promise<Response> {
    return new Promise<Response>((resolve) => {
        passport.authenticate("steam", { session: false })(request, {} as any, (err, user) => {
            if (err || !user) {
                console.error("Erro de autenticação:", err);
                return resolve(NextResponse.redirect(new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_BASE_URL)));
            }

            // Redireciona após login bem-sucedido
            return resolve(NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL)));
        });
    });
}
