"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { fetchVisitors } from "@/lib/services/api";

export function VisitorsCounterSection() {
    const [count, setCount] = useState<number | null>(null);
    const [display, setDisplay] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 1) Fetch & register this visit on mount
    useEffect(() => {
        const registerVisit = async () => {
            const count = await fetchVisitors();
            setCount(count);
        };
        registerVisit();
    }, []);

    // 2) Observe when section enters viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasAnimated(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // 3) Trigger count-up animation once in view & count is known
    useEffect(() => {
        if (!hasAnimated || count === null) return;

        let start = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = Math.ceil(duration / stepTime);
        const increment = Math.max(Math.round(count / steps), 1);

        const timer = setInterval(() => {
            start += increment;
            if (start >= count) {
                setDisplay(count);
                clearInterval(timer);
            } else {
                setDisplay(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [hasAnimated, count]);

    return (
        <section className="py-12 bg-muted/70" ref={containerRef}>
            <div className="container px-4 mx-auto text-center">
                <Card className="p-6 mx-auto max-w-md">
                    <h2 className="text-2xl font-bold mb-2">
                        🎉 Visitors Count
                    </h2>
                    <p className="text-4xl font-extrabold text-primary">
                        {count === null
                            ? "Loading..."
                            : hasAnimated
                            ? display.toLocaleString()
                            : "0"}
                    </p>
                    <p className="text-muted-foreground mt-2">
                        Thanks for stopping by!
                    </p>
                </Card>
            </div>
        </section>
    );
}
