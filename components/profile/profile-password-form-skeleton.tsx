"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

/**
 * ProfilePasswordFormLoading Component
 *
 * This component acts as a placeholder while the password form data is loading.
 * It mimics the layout of the ProfilePasswordForm with skeleton elements:
 * - Header: Title & description.
 * - Three password input fields (for current password, new password, and confirm password).
 * - A submit button.
 */
export default function ProfilePasswordFormLoading() {
    return (
        // Card Skeleton
        <Card>
            <div className="space-y-4">
                {/* Current Password Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3 rounded" /> {/* Label */}
                    <Skeleton className="h-10 w-full rounded" /> {/* Input */}
                    <Skeleton className="h-4 w-2/3 rounded" />{" "}
                    {/* Message/Error placeholder */}
                </div>
                {/* New Password Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3 rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                {/* Confirm Password Field Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3 rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                </div>
            </div>
            {/* Submit Button Skeleton */}
            <div className="flex justify-end mt-6">
                <Skeleton className="h-10 w-32 rounded" />
            </div>
        </Card>
    );
}
