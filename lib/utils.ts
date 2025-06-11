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
        });
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
 * Calculates the reading time of a given text in minutes.
 */
export function calculateReadingTime(content: string): number {
    const words = content.split(/\s+/).length; // Split by spaces to count words
    const wordsPerMinute = 200; // Average reading speed

    const minutes = Math.ceil(words / wordsPerMinute);

    return minutes;
}

/**
 * Capitalizes the first character of a given word.
 *
 * @param word - The input string to capitalize
 * @returns The word with its first letter capitalized
 */
export function capitalize(word: string): string {
    if (!word) return ""; // Return an empty string if input is falsy (e.g., null, undefined, empty)

    // Uppercase the first character and append the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Turn a camelCase or PascalCase identifier into a human-readable phrase:
 * - Inserts a space before each uppercase letter (except at index 0)
 * - Capitalizes the first character of the whole phrase
 *
 * @param text - e.g. "helloWorldAgain" or "MyTestString"
 * @returns e.g. "Hello world again" or "My test string"
 */
export function humanize(text: string): string {
    if (!text) return "";

    // 1. Insert spaces before uppercase letters (but not at start)
    //    (?<!^) = negative lookbehind for start of string
    const spaced = text.replace(/(?<!^)([A-Z])/g, " $1").replace(/^ /, "");

    // 2. Capitalize just the first character of the entire phrase
    return capitalize(spaced);
}

/**
 * Calculates the discount percentage between an original price
 * and a discounted price.
 *
 * @param {(number | Decimal)} original - The original price (must be > 0).
 * @param {(number | Decimal)} discounted - The discounted price.
 * @param {number} [fractionDigits=0] - How many decimal places in the output.
 * @returns {string} The discount percentage formatted with a “%” sign.
 *
 * @example
 * getDiscountPercent(100, 75);        // "25%"
 * getDiscountPercent(new Decimal(200), new Decimal(150), 1); // "25.0%"
 */
interface DecimalLike {
    toNumber(): number;
}

export function getDiscountPercent(
    original: number | DecimalLike,
    discounted: number | DecimalLike,
    fractionDigits = 0
): string {
    const orig = isDecimalLike(original) ? original.toNumber() : original;
    const disc = isDecimalLike(discounted) ? discounted.toNumber() : discounted;

    if (orig <= 0) {
        throw new Error("Original price must be greater than zero");
    }

    const percent = ((orig - disc) / orig) * 100;
    return `${percent.toFixed(fractionDigits)}%`;
}

function isDecimalLike(value: unknown): value is DecimalLike {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as DecimalLike).toNumber === "function"
    );
}

interface ExcerptOptions {
    content: string;
    wordCount?: number;
    maxChars?: number;
    suffix?: string;
}

/**
 * Returns an excerpt up to `wordCount` words **and** up to `maxChars` characters,
 * stripping any HTML, never cutting words in half, and appending a suffix if truncated.
 *
 * @param content   The raw HTML or plain text
 * @param wordCount Maximum number of words to include (default 30)
 * @param maxChars  Maximum number of characters to include (default 200)
 * @param suffix    What to append when truncated (default "…")
 */
export function excerptByWords({
    content,
    wordCount = 30,
    maxChars = 200,
    suffix = "…",
}: ExcerptOptions): string {
    if (!content) return "";

    // 1. Strip HTML tags
    const text = content.replace(/<[^>]+>/g, "").trim();

    // 2. Split on whitespace and filter out empty strings
    const words = text.split(/\s+/).filter(Boolean);

    // 3. Build a word-limited excerpt (without suffix for now)
    let excerpt =
        words.length > wordCount ? words.slice(0, wordCount).join(" ") : text;

    // 4. If it’s still too long in characters, cut at maxChars without breaking words
    if (excerpt.length > maxChars) {
        const cut = excerpt.slice(0, maxChars);
        const lastSpace = cut.lastIndexOf(" ");
        excerpt = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
    }

    // 5. If we truncated by words OR by chars, append the suffix
    const wasTruncated =
        words.length > wordCount || excerpt.length < text.length;
    return wasTruncated ? excerpt + suffix : excerpt;
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
