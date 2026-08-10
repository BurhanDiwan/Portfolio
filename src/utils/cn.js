import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes safely.
 * Solves conflicts when passing utility classes as props.
 * @param {...(string|Object|Array)} inputs - Class names, conditional objects, or arrays.
 * @returns {string} Merged and conflict-free class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
