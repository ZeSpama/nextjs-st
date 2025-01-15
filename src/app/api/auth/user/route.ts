import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import router from "@/lib/router";

export async function GET(req: NextRequest) {
    try {
        // Ajuste para capturar informações do usuário
        const user = await router.run(req as any, {} as any);
        
        // Se `router.run` retorna `void`, adapte para obter o usuário
        if (typeof user === 'undefined') {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
