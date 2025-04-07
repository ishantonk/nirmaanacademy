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
* Formats a date to a readable string
*/
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
  }).format(date);
}

/**
* Formats a number as currency
*/
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
  }).format(amount);
}

/**
* Serializes a Prisma Decimal to a number
*/
export function serializeDecimal(decimal: Decimal | null): number | null {
  if (!decimal) return null;
  return Number(decimal);
}

type SerializedValue =
  | string
  | number
  | boolean
  | null
  | SerializedValue[]
  | { [key: string]: SerializedValue };

/**
* Recursively serializes all Decimal values in a Prisma object to numbers
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializePrismaObject<T extends Record<string, any>>(
  obj: T
): { [K in keyof T]: SerializedValue } {
  const serialized = { ...obj } as { [K in keyof T]: SerializedValue };
  for (const key in serialized) {
      const value = serialized[key];
      if (value && typeof value === "object" && "toNumber" in value) {
          serialized[key] = Number(value);
      } else if (typeof value === "object" && value !== null) {
          serialized[key] = serializePrismaObject(value);
      }
  }
  return serialized;
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
