import { NextResponse } from "next/server";
import passport from "@/lib/passport";
import router from "@/lib/router";

export async function GET(req: Request) {
    try {
        // Simule a lógica de autenticação usando Passport
        const user = await new Promise((resolve, reject) => {
            router.use(passport.authenticate("steam"), (req: any, res: any) => {
                if (req.user) resolve(req.user);
                else reject("Authentication failed");
            });
        });

        if (user) {
            return NextResponse.redirect("/"); // Redirecione após autenticar
        } else {
            return NextResponse.redirect("/?error=failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
