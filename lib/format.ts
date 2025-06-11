import type { Decimal } from "@prisma/client/runtime/library";

/**
 * Formats a price value (in cents or Decimal) into a localized currency string.
 *
 * @param {(number | Decimal | null)} value - The price to format. Can be a number, Decimal instance, or null/undefined.
 * @returns {string} A string representing the formatted price in Indian Rupees (INR), according to the en-IN locale.
 */
export function formatPrice(value: number | Decimal | null = 0): string {
    // Ensure we have a numeric base value
    if (value === null) {
        value = 0;
    } else if (typeof value === "object") {
        value = Number(value);
    }

    // Format using Intl.NumberFormat for the en-IN locale
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

/**
 * Format a date to a string
 */
export function formatDate(date: Date | string) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);
}

/**
 * Format a duration in seconds to a string (e.g. "1h 30m")
 */
export function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }

    return `${minutes}m`;
}
