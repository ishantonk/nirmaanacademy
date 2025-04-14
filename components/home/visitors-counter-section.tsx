"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export function VisitorsCounterSection() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // Increment + fetch visitor count
        const registerVisit = async () => {
            try {
                const res = await fetch("/api/visitors", { method: "POST" });
                const data = await res.json();
                setCount(data.count);
            } catch (error) {
                console.error("Failed to fetch visitor count", error);
            }
        };

        registerVisit();
    }, []);

    return (
        <section className="py-12 bg-muted/70">
            <div className="container px-4 mx-auto text-center">
                <Card className="p-6 mx-auto max-w-md">
                    <h2 className="text-2xl font-bold mb-2">
                        🎉 Visitors Count
                    </h2>
                    <p className="text-4xl font-extrabold text-primary">
                        {count !== null ? count.toLocaleString() : "Loading..."}
                    </p>
                    <p className="text-muted-foreground mt-2">
                        Thanks for stopping by!
                    </p>
                </Card>
            </div>
        </section>
    );
}
