import { clsx, type ClassValue } from "clsx";
import { tailwindMerge } from "tailwind-merge";

/**
 * Combines dynamic styling classnames using clsx and safely merges 
 * overlapping Tailwind utility properties.
 */
export function cn(...inputs: ClassValue[]): string {
  return tailwindMerge(clsx(inputs));
}
