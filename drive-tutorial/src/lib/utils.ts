import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const FILE_WEIGHTS = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};
type Unit = keyof typeof FILE_WEIGHTS;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
});

export function fileSize(fileSize: number) {
  let prev: [Unit, number] = ["B", 1];
  Object.entries(FILE_WEIGHTS).filter(([key, value]) => {
    if (fileSize < value) {
      return prev;
    }
    prev = [key as Unit, value];
  });

  const [unit, size] = prev;
  return [unit, Math.ceil(fileSize / size)];
}
