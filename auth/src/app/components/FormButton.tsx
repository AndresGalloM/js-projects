import { useFormStatus } from "react-dom";

export default function FormButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-2 py-1 rounded-md bg-white text-black hover:cursor-pointer"
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
