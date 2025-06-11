/**
 * Custom React hook to detect whether a Radix ScrollArea viewport has been scrolled vertically.
 *
 * This hook attaches a scroll listener to the element matching the
 * [data-radix-scroll-area-viewport] selector and updates a boolean state
 * whenever its scrollTop value is greater than zero.
 *
 * @returns {boolean} - True if the viewport has been scrolled down at least one pixel, false otherwise.
 */
import * as React from "react";

// Tracks if the Radix ScrollArea viewport has been scrolled
export default function useScrolled() {
    // State to track whether the viewport has been scrolled
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        // Query for the Radix ScrollArea viewport element
        const viewport = document.querySelector<HTMLElement>(
            "[data-radix-scroll-area-viewport]"
        );
        // If the viewport isn't found, skip attaching listeners
        if (!viewport) return;

        // Handler to set scrolled state based on scroll position
        const onScroll = () => {
            // viewport.scrollTop > 0 means user has scrolled down
            setScrolled(viewport.scrollTop > 0);
        };

        // Initialize state on mount
        onScroll();
        // Attach scroll listener
        viewport.addEventListener("scroll", onScroll);
        // Cleanup listener on unmount
        return () => viewport.removeEventListener("scroll", onScroll);
    }, []); // Empty dependency array: run once on mount and cleanup on unmount

    // Return whether the area has been scrolled
    return scrolled;
}
