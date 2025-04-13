"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProfileFormSkeleton() {
    return (
        // Card Skeleton
        <Card>
            {/* Card Header Skeleton */}
            <div className="mb-6">
                <Skeleton className="h-8 w-1/2 rounded" />{" "}
                {/* Simulated Title */}
                <Skeleton className="h-4 w-full mt-2 rounded" />{" "}
                {/* Simulated Description */}
            </div>

            {/* Profile Image Field Skeleton */}
            <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-28 w-28 rounded-full border" />
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
                {/* Name Field */}
                <div>
                    <Skeleton className="h-6 w-2/3 rounded" />
                    <Skeleton className="h-4 w-full rounded mt-1" />
                </div>
                {/* Email Field */}
                <div>
                    <Skeleton className="h-6 w-2/3 rounded" />
                    <Skeleton className="h-4 w-full rounded mt-1" />
                </div>
                {/* Bio Field */}
                <div>
                    <Skeleton className="h-24 w-full rounded" />
                </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="flex justify-end mt-6">
                <Skeleton className="h-10 w-32 rounded" />
            </div>
        </Card>
    );
}
