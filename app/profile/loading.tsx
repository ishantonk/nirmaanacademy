"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProfileFormSkeleton } from "@/components/profile/profile-form-skeleton";

export default function Loading() {
    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Profile Settings
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Update your personal information and manage account security
                    settings including password changes on your Nirmaan Academy
                    profile.
                </p>
            </div>

            {/* Tabs Skeleton */}
            <div className="w-full">
                {/* Tabs triggers (General & Password) */}
                <div className="grid w-full grid-cols-2 lg:w-[400px] gap-2 mb-6 animate-pulse">
                    <Skeleton className="h-8" />
                    <Skeleton className="h-8" />
                </div>

                {/* Tab panel content skeleton for "General" tab */}
                <ProfileFormSkeleton />
            </div>
        </div>
    );
}
