"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
        <div>
            <Card>
                {/* Header Section */}
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                </CardHeader>

                {/* Content Section */}
                <CardContent>
                    {placeholderItems.map((_, index) => (
                        <div key={index} className="flex justify-between mb-4">
                            {/* Simulated cart item title */}
                            <Skeleton className="h-4 w-2/3" />
                            {/* Simulated cart item price */}
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    ))}
                    <Separator />
                </CardContent>

                {/* Footer Section */}
                <CardFooter className="flex flex-col gap-4">
                    <div className="flex justify-between font-semibold">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>

                    {/* Simulated checkout button */}
                    <Skeleton className="h-8 w-full rounded-md" />
                </CardFooter>
            </Card>
        </div>
    );
}
