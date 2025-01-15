import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encryption"; // Você precisará implementar esta função

export async function GET() {
    const steamUserCookie = cookies().get("steamUser");
    
    if (!steamUserCookie) {
        return NextResponse.json({ user: null }, { status: 401 });
    }
    
    try {
        const decryptedUser = decrypt(steamUserCookie.value);
        const user = JSON.parse(decryptedUser);
        
        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error decrypting user data:", error);
        return NextResponse.json({ user: null }, { status: 401 });
    }
}

