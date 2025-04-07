import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <div className="animate-pulse grid gap-8 md:grid-cols-2">
                {/* Thumbnail skeleton */}
                <div>
                    <Skeleton className="aspect-video w-full rounded-lg" />
                </div>

                {/* Course details skeleton */}
                <div className="flex flex-col space-y-4">
                    {/* Category badge skeleton */}
                    <Skeleton className="w-24 h-6 rounded" />
                    {/* Title skeleton */}
                    <Skeleton className="w-3/4 h-10 rounded" />
                    {/* Reviews and enrollment skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-16 h-4 rounded" />
                        <Skeleton className="w-8 h-4 rounded" />
                        <Skeleton className="w-40 h-4 rounded" />
                    </div>
                    {/* Duration and certificate skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-16 h-4 rounded" />
                        <Skeleton className="w-16 h-4 rounded" />
                    </div>
                    {/* Faculty info skeleton */}
                    <Skeleton className="w-48 h-12 rounded" />
                    {/* Price skeleton */}
                    <Skeleton className="w-32 h-8 rounded" />
                    {/* Select dropdowns skeleton */}
                    <div className="flex gap-2">
                        <Skeleton className="w-44 h-10 rounded" />
                        <Skeleton className="w-32 h-10 rounded" />
                    </div>
                    {/* Add-to-cart button skeleton */}
                    <Skeleton className="w-full h-10 rounded" />
                </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                {/* Main content skeleton */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description skeleton */}
                    <div>
                        <Skeleton className="w-1/2 h-8 rounded" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-5/6 h-4 rounded" />
                        </div>
                    </div>

                    {/* Course content info skeleton */}
                    <div>
                        <Skeleton className="w-1/3 h-8 rounded" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                        </div>
                    </div>

                    {/* Faculties list skeleton */}
                    <div>
                        <Skeleton className="w-1/3 h-8 rounded" />
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <Skeleton className="h-12 rounded" />
                            <Skeleton className="h-12 rounded" />
                        </div>
                    </div>

                    {/* Reviews skeleton */}
                    <div>
                        <Skeleton className="w-1/3 h-8 rounded" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-2/3 h-4 rounded" />
                        </div>
                    </div>
                </div>

                {/* Sidebar skeleton */}
                <div>
                    <div className="rounded-lg border p-4">
                        <Skeleton className="w-1/2 h-6 rounded" />
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="w-32 h-4 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="w-32 h-4 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-4 h-4 rounded-full" />
                                <Skeleton className="w-32 h-4 rounded" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Skeleton className="w-full h-10 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
