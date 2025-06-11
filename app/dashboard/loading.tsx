import { CourseCardSkeleton } from "@/components/course/course-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    View your purchased or enrolled courses.
                </p>
            </div>

            <div className="mt-8">
                <Skeleton className="h-8 w-40 mb-4" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
