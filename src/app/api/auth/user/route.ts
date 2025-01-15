import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const steamUserCookie = (await cookies()).get("steamUser");

    if (!steamUserCookie) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: steamUserCookie.value });
}
