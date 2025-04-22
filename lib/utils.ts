import { Decimal } from "@prisma/client/runtime/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Grab the current request's "cookie" header.
 * Must be called inside a server action/request handler.
 */
async function getCookieHeader(): Promise<string> {
    const { headers } = await import("next/headers");
    const resolvedHeaders = await headers();
    return resolvedHeaders.get("cookie") ?? "";
}

/**
 * A small wrapper around fetch() that automatically
 * includes the user's cookie and disables caching.
 */
async function fetchWithAuth(
    input: RequestInfo,
    init: RequestInit = {}
): Promise<Response> {
    const isServer = typeof window === "undefined";

    if (isServer) {
      const cookie = await getCookieHeader();
      return fetch(input, {
          ...init,
          headers: {
              "Content-Type": "application/json",
              ...(init.headers as Record<string, string>),
              cookie,
          },
          cache: "no-store",
      });
    } else {
      return fetch(input, {
        ...init,
        credentials: "include",
      })
    }

}

// Function for handling fetch error effectively.
export async function safeFetch<T>(
    input: RequestInfo,
    init?: RequestInit,
    errorMessage?: string,
    useAuth: boolean = false
): Promise<T> {
    try {
        const response = useAuth
            ? await fetchWithAuth(input, init)
            : await fetch(input, init);
        if (!response.ok) {
            throw new Error(
                `${errorMessage || "Request failed"}: ${response.statusText} (${
                    response.status
                })`
            );
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${errorMessage || "Network error"}: ${error}`);
    }
}

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
