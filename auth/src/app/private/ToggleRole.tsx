"use client";

import { toggleRole } from "@/auth/actions";

export default function ToggleRole() {
  return (
    <button
      className="px-2 py-1 border border-white rounded-md hover:cursor-pointer"
      onClick={toggleRole}
    >
      Toggle Role
    </button>
  );
}
