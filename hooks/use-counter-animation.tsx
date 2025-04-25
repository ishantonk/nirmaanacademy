"use client";

import { useEffect, useRef, useState } from "react";

export function useCounterAnimation(targetCount: number | null) {
    const [display, setDisplay] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for viewport detection
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Counter animation logic
    useEffect(() => {
        if (!hasAnimated || targetCount === null) return;

        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = Math.ceil(duration / stepTime);
        const increment = Math.max(Math.round(targetCount / steps), 1);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetCount) {
                setDisplay(targetCount);
                clearInterval(timer);
            } else {
                setDisplay(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [hasAnimated, targetCount]);

    return { display, containerRef, hasAnimated };
}
