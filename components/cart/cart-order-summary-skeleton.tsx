"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/**
 * CartOrderSummarySkeleton Component
 *
 * This component acts as a placeholder while the cart order summary data is loading.
 * It simulates:
 * - The order summary header.
 * - A list of cart items with title and price placeholders.
 * - A separator.
 * - The total price line.
 * - The checkout button.
 */
export function CartOrderSummarySkeleton() {
    // Adjust the number of items to match the expected number of cart items
    const placeholderItems = Array.from({ length: 3 });

    return (
        <Card>
            {/* Header Section */}
            <div className="p-4">
                <Skeleton className="h-6 w-1/2 rounded" />
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-4">
                {placeholderItems.map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        {/* Simulated cart item title */}
                        <Skeleton className="h-4 w-2/3 rounded" />
                        {/* Simulated cart item price */}
                        <Skeleton className="h-4 w-1/4 rounded" />
                    </div>
                ))}
                <Separator />
            </div>

            {/* Footer Section */}
            <div className="p-4 space-y-4">
                <div className="flex justify-between font-semibold">
                    <Skeleton className="h-5 w-1/4 rounded" />
                    <Skeleton className="h-5 w-1/4 rounded" />
                </div>
                {/* Simulated checkout button */}
                <Button className="w-full" disabled>
                    <Skeleton className="h-10 w-full rounded" />
                </Button>
            </div>
        </Card>
    );
}
