import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-[7%] flex flex-col">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft /> Home
        </Link>

        <div className="mt-4">
          <h2 className="text-5xl">
            <span className="font-bold">404</span>{" "}
            <span className="text-gray-300">Not Found</span>
          </h2>
          <p className="mt-2">Could not find requested resource</p>
        </div>
      </div>
    </div>
  );
}
