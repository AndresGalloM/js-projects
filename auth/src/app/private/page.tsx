import { getCurrentUser } from "@/auth/currentUser";
import ToggleRole from "./ToggleRole";

export default async function Private() {
  const user = await getCurrentUser();

  return (
    <main>
      <h1 className="text-2xl">Private: {user.role}</h1>
      <ToggleRole />
    </main>
  );
}
