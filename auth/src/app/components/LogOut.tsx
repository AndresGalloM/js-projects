import { signOut } from "@/auth/actions";

export default function LogOut() {
  return (
    <button
      onClick={signOut}
      className="px-2 py-1 border border-white rounded-md hover:cursor-pointer hover:bg-gray-950"
    >
      LogOut
    </button>
  );
}
