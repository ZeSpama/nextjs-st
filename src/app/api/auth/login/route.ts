import { NextResponse } from "next/server";
import passport from "@/lib/passport";

export async function GET(request: Request) {
    return new Promise((resolve) => {
        passport.authenticate("steam", { session: false })(request, {}, (err: Error | null, user: Express.User | false) => {
            if (err || !user) {
                console.error("Erro de autenticação:", err);
                return resolve(NextResponse.redirect(new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_BASE_URL)));
            }
            
            
            // Redirect to the return route
            return resolve(NextResponse.redirect(new URL("/api/auth/return", process.env.NEXT_PUBLIC_BASE_URL)));
        });
    });
}

