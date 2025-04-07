/**
 * Format a price in cents to a string with currency symbol
 */
export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
    }).format(price);
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
