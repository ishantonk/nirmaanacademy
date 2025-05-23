"use client";

import { Card } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { fetchVisitors } from "@/lib/services/api";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export function FooterVisitorsCount() {
    const [count, setCount] = useState<number | null>(null);
    const { display, containerRef, hasAnimated } = useCounterAnimation(count);

    useEffect(() => {
        const loadCount = async () => {
            const response = await fetchVisitors();
            setCount(response);
        };
        loadCount();
    }, []);
    return (
        <div
            className="flex flex-col items-center justify-center space-y-2"
            ref={containerRef}
        >
            <Card className="p-4 text-center bg-primary/20 border">
                <h2 className="flex flex-row items-center justify-center text-2xl font-semibold gap-4">
                    <Users className="w-6 h-6" />
                    <span>
                        Join{" "}
                        <span className="text-primary font-extrabold">
                            {count === null
                                ? "Loading..."
                                : hasAnimated
                                ? display.toLocaleString()
                                : "0"}
                        </span>{" "}
                        learners
                    </span>
                </h2>
                <p className="text-sm text-muted-foreground drop-shadow-2xl">
                    Start your learning journey today!
                </p>
            </Card>
        </div>
    );
}
