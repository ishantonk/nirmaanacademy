import * as React from "react";

// Pixel width threshold below which the UI is considered in mobile mode
const MOBILE_BREAKPOINT = 768;

/**
 * Determines if the current viewport width falls under the mobile breakpoint.
 * Uses a MediaQueryList listener to update on resize.
 *
 * @returns {boolean} - True for mobile view, false otherwise.
 */
export default function useIsMobile(): boolean {
    // State is undefined until evaluated; becomes true/false after first effect
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
        undefined
    );

    React.useEffect(() => {
        const mql = window.matchMedia(
            `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
        );
        // Update state whenever media query match status changes
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        // Initialize state on mount
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        // Cleanup listener on unmount
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return !!isMobile;
}
