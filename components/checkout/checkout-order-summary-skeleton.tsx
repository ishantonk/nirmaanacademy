"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CheckoutOrderSummarySkeleton() {
    // Define a fixed number of placeholder items (e.g., 3)
    const placeholderItems = Array.from({ length: 3 });

    return (
        <Card>
            {/* Header Skeleton */}
            <CardHeader>
                <Skeleton className="h-8 w-1/2 rounded mb-2" />{" "}
                {/* Simulated Order Summary Title */}
            </CardHeader>

            {/* Content Skeleton */}
            <CardContent>
                <ul className="divide-y">
                    {placeholderItems.map((_, index) => (
                        <li
                            key={index}
                            className="py-4 flex justify-between items-center"
                        >
                            {/* Simulated Course Title */}
                            <Skeleton className="h-4 w-2/3 rounded" />
                            {/* Simulated Price */}
                            <Skeleton className="h-4 w-1/4 rounded" />
                        </li>
                    ))}
                </ul>
                <Separator className="my-4" />
            </CardContent>

            {/* Footer Skeleton */}
            <CardFooter>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/4 rounded" />
                    {/* Label "Total" */}
                    <Skeleton className="h-5 w-1/4 rounded" />
                    {/* Total Price */}
                </div>
            </CardFooter>
        </Card>
    );
}
