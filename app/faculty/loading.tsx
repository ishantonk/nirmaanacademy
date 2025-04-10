import { FacultyCardSkeleton } from "@/components/faculty/faculty-card-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header Skeleton */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">
                    Our Expert Faculties
                </h1>
                <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
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
