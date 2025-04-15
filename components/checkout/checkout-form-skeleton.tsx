"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * CheckoutFormSkeleton Component
 *
 * This component acts as a placeholder while the CheckoutForm is loading.
 * It simulates the structure of the payment details form by displaying:
 * - A header placeholder for the "Payment Details" title.
 * - Skeletons for the "Full Name" and "Email" input fields.
 * - A skeleton for the submit button.
 */
export function CheckoutFormSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <Skeleton className="h-6 w-1/2 rounded" />

            {/* Name Field Skeleton */}
            <div className="space-y-2">
                {/* Label placeholder */}
                <Skeleton className="h-5 w-1/3 rounded" />
                {/* Input placeholder */}
                <Skeleton className="h-10 w-full rounded" />
                {/* Optional helper text placeholder */}
                <Skeleton className="h-4 w-1/2 rounded" />
            </div>

            {/* Email Field Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 rounded" />
                <Skeleton className="h-10 w-full rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
            </div>

            {/* Submit Button Skeleton */}
            <Skeleton className="h-10 w-full rounded" />
        </div>
    );
}
