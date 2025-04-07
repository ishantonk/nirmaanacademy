import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
    return (
        <Card className="overflow-hidden p-0 pb-4">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <Skeleton className="h-full w-full absolute inset-0" />
            </div>

            {/* Header */}
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20 rounded-full" />{" "}
                    {/* Category */}
                    <Skeleton className="h-5 w-12" /> {/* Price */}
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-2/3" />
            </CardHeader>

            {/* Content */}
            <CardContent>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
                    <Skeleton className="h-4 w-24" /> {/* Faculty Name */}
                </div>
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-5/6" />
            </CardContent>

            {/* Optional Actions Footer */}
            <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
            </CardFooter>
        </Card>
    );
}
