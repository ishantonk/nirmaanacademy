import { Decimal } from "@prisma/client/runtime/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
* Serializes a Prisma Decimal to a number
*/
export function serializeDecimal(decimal: Decimal | null): number | null {
  if (!decimal) return null;
  return Number(decimal);
}

/**
* Convert a string to a slug
*/
export function slugify(text: string) {
  return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
}

/**
* Generate a random string
*/
export function generateRandomString(length: number) {
  const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
* Get the initials of a name
*/
export function getInitials(name: string) {
  return name
      .split(" ")
      .slice(0, 2) // Limit to the first two words
      .map((n) => n[0])
      .join("")
      .toUpperCase();
}

/**
* Check if a URL is valid
*/
export function isValidUrl(url: string) {
  try {
      new URL(url);
      return true;
  } catch {
      return false;
  }
}
