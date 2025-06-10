import { getCurrentUser } from "@/auth/currentUser";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      {user && (
        <>
          <section>
            <p>{user.id}</p>
            <p>{user.role}</p>
          </section>

          <Link href="/private">Private</Link>
        </>
      )}
    </main>
  );
}
