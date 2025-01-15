import Link from "next/link";

// Função para obter o usuário autenticado no lado do servidor
async function getUser(): Promise<{ user: { id: string } | null }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, { cache: "no-store" });
    if (!response.ok) return { user: null }; // Retorna null se não estiver autenticado
    const data = await response.json();
    return { user: data.user || null };
}

export default async function Home() {
    const { user } = await getUser(); // Chama a API para obter o usuário

    return (
        <div style={{ textAlign: "center" }}>
            {user ? (
                <div>
                    Welcome back!
                    <br />
                    From logging in, your SteamID is {user.id}.
                    <br />
                    <Link href="/api/auth/logout">Logout</Link>
                </div>
            ) : (
                <div>
                    Welcome!<br />
                    <Link href="/api/auth/login">Login</Link>
                </div>
            )}
        </div>
    );
}
