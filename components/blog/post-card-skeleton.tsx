import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PostCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden py-0 pb-6">
            <div className="bg-gray-100 relative aspect-video rounded-lg">
                <Skeleton className="w-full h-full" />
            </div>
            <CardHeader>
                <Skeleton className="w-24 h-5 rounded-md" /> {/* Badge */}
                <Skeleton className="w-3/4 h-6" /> {/* Title */}
            </CardHeader>
            <CardContent className="p-4 space-y-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4" /> {/* Description lines */}
                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="w-28 h-4" /> {/* Author */}
                    <Skeleton className="w-16 h-4" /> {/* Read time */}
                </div>
                <Skeleton className="w-full h-10 rounded-md" /> {/* Button */}
            </CardContent>
        </Card>
    );
}
