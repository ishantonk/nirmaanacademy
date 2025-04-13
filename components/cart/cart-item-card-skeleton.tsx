"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

/**
 * CartItemCardSkeleton Component
 *
 * This component simulates the loading state of a cart item.
 * It mimics the layout of the CartItemCard, including the image,
 * title area, description area, and price with a remove button.
 */
export function CartItemCardSkeleton() {
    return (
        <Card className="flex-row gap-4 p-4 animate-pulse">
            {/* Image placeholder */}
            <div className="h-24 w-24 rounded-md bg-muted" />

            {/* Right side: Title, faculty info & price/button area */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    {/* Title placeholder */}
                    <Skeleton className="h-6 w-3/4 rounded" />
                    {/* Faculty info placeholder */}
                    <Skeleton className="h-4 w-1/2 rounded mt-2" />
                </div>
                <div className="flex items-center justify-between mt-2">
                    {/* Price placeholder */}
                    <Skeleton className="h-5 w-16 rounded" />
                    {/* Remove button placeholder */}
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </Card>
    );
}
