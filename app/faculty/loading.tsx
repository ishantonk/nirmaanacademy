import { FacultyCardSkeleton } from "@/components/faculty/faculty-card-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header Skeleton */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Our Expert Faculties
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Learn from experienced professionals in business law,
                    corporate governance, and finance law.
                </p>
            </div>

            {/* Faculty Card Skeleton Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <FacultyCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
