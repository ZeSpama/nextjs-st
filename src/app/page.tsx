import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/encryption"; // Você precisará implementar esta função

async function getUser() {
    const steamUserCookie = cookies().get("steamUser");
    if (!steamUserCookie) return null;

    try {
        const decryptedUser = decrypt(steamUserCookie.value);
        return JSON.parse(decryptedUser);
    } catch (error) {
        console.error("Error decrypting user data:", error);
        return null;
    }
}

export default async function Home() {
    const user = await getUser();

    return (
        <div style={{ textAlign: "center" }}>
            {user ? (
                <div>
                    Welcome back, {user.displayName}!
                    <br />
                    Your SteamID is {user.id}.
                    <br />
                    <Link href="/api/auth/logout">Logout</Link>
                </div>
            ) : (
                <div>
                    Welcome!<br />
                    <Link href="/api/auth/login">Login with Steam</Link>
                </div>
            )}
        </div>
    );
}

