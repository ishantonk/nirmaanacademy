"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileFormSkeleton() {
    return (
        <div className="container mx-auto py-8 px-4">
            {/* Page Header Skeleton */}
            <div className="mb-10 animate-pulse">
                <Skeleton className="h-10 w-1/3 mx-auto mb-2 rounded" />
                <Skeleton className="h-4 w-1/2 mx-auto rounded" />
            </div>

            {/* Card Skeleton */}
            <div className="rounded-lg border p-4 animate-pulse">
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
            </div>
        </div>
    );
}
