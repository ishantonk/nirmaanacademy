import { Skeleton } from "@/components/ui/skeleton";

export function FacultyCardSkeleton() {
    return (
        <div className="flex flex-col gap-y-6 overflow-hidden">
            <div className="flex flex-col space-y-2 text-center">
                <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-1/3 mx-auto" />
            </div>
            <div className="flex flex-col space-y-2 text-center">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <div className="flex flex-row gap-2 justify-center items-center mx-auto">
                    <Skeleton className="h-4 w-1/4 mx-auto" />
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <Skeleton className="h-4 w-1/4 mx-auto" />
                </div>
            </div>
        </div>
    );
}
