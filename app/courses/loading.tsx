import { Skeleton } from "@/components/ui/skeleton";
import { CourseFiltersSkeleton } from "@/components/course/course-filters-skeleton";
import { CourseGrid } from "@/components/course/course-grid";
import { CourseCardSkeleton } from "@/components/course/course-card";

export default function Loading() {
    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Browse Courses
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    View all courses we provide.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar with filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="sticky top-20">
                        <CourseFiltersSkeleton />
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <div className="relative">
                            {/* Simulate icon */}
                            <Skeleton className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" />
                            {/* Simulate input */}
                            <Skeleton className="h-10 w-full rounded-md pl-10" />
                        </div>
                    </div>

                    <CourseGrid
                        courses={Array.from({ length: 6 }).map((_, i) => (
                            <CourseCardSkeleton key={i} />
                        ))}
                    />
                </div>
            </div>
        </>
    );
}
