import { NextResponse } from "next/server";

// Rota de Login - Redireciona para o Steam
export async function GET() {
    const steamLoginUrl = new URL("https://steamcommunity.com/openid/login");
    steamLoginUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
    steamLoginUrl.searchParams.set("openid.mode", "checkid_setup");
    steamLoginUrl.searchParams.set("openid.return_to", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/return`);
    steamLoginUrl.searchParams.set("openid.realm", `${process.env.NEXT_PUBLIC_BASE_URL}`);
    steamLoginUrl.searchParams.set("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select");
    steamLoginUrl.searchParams.set("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select");

    return NextResponse.redirect(steamLoginUrl.toString());
}
