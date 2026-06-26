import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  let mb = bytes / (1024 * 1024);

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
}

export function similarityColor(similarity: number) {
  if (similarity >= 95) {
    return "#A82D00";
  }

  if (similarity >= 75 && similarity < 95) {
    return "#CF8F27";
  }

  return "#1FAB2D";
}
