import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
});
