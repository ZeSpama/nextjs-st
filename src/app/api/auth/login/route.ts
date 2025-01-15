import { NextResponse } from "next/server";
import passport from "@/lib/passport";
import { NextApiRequest } from "next";  // Importa para tipagem

export async function GET(request: Request): Promise<Response> {
    return new Promise<Response>((resolve) => {
        passport.authenticate("steam", { session: false })(
            request as unknown as NextApiRequest, 
            {} as any, 
            (err: Error | null, user: Express.User | false) => {
                if (err) {
                    console.error("Erro de autenticação:", err);
                    return resolve(
                        NextResponse.redirect(new URL(`/error?message=${encodeURIComponent(err.message)}`, process.env.NEXT_PUBLIC_BASE_URL))
                    );
                }
                if (!user) {
                    console.error("Usuário não autenticado.");
                    return resolve(
                        NextResponse.redirect(new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_BASE_URL))
                    );
                }
                // Log de sucesso
                console.log("Usuário autenticado:", user);
                // Redireciona após login bem-sucedido
                return resolve(
                    NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL))
                );
            }
        );
    });
}
