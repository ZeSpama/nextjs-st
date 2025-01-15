import { NextResponse } from "next/server";
import passport from "@/lib/passport";

export async function GET(request: Request) {
    return new Promise((resolve) => {
        passport.authenticate("steam", { session: false })(request, {}, (err, user) => {
            if (err || !user) {
                return resolve(NextResponse.redirect(new URL("/api/auth/login?error=failed", process.env.NEXT_PUBLIC_BASE_URL)));
            }
            
            // Redirecionar para a rota de retorno
            return resolve(NextResponse.redirect(new URL("/api/auth/return", process.env.NEXT_PUBLIC_BASE_URL)));
        });
    });
}

