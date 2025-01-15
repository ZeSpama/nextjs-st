import { NextResponse } from "next/server";
import passport from "@/lib/passport";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/encryption";

export async function GET(request: Request) {
    return new Promise((resolve) => {
        passport.authenticate("steam", { session: false }, (err, user) => {
            if (err || !user) {
                return resolve(NextResponse.redirect(new URL("/?error=auth_failed", process.env.NEXT_PUBLIC_BASE_URL)));
            }
            
            const encryptedUser = encrypt(JSON.stringify(user));
            
            cookies().set("steamUser", encryptedUser, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7 // 1 semana
            });
            
            return resolve(NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL)));
        })(request);
    });
}

