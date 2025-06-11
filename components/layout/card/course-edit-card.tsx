import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { CourseEdit } from "@/components/layout/dialog/course-edit";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { updateCourseStatus } from "@/lib/services/api";
import { isValidUrl } from "@/lib/utils";
import {
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
} from "@/lib/types";

interface CourseEditCardProps {
    course: CourseType;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
}

type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export function CourseEditCard({
    course,
    categories,
    attempts,
    faculties,
    modes,
}: CourseEditCardProps) {
    const updateMutation = useGenericMutation<
        { status: CourseStatus },
        { status: CourseStatus }
    >({
        mutationFn: ({ status }) =>
            updateCourseStatus(course.slug, { status: status }),
        action: "update",
        entityName: "Course status",
        queryKeyToInvalidate: ["courses"],
    });

    return (
        <div className="grid grid-cols-6 bg-muted/50 border border-muted rounded-lg p-3 gap-4">
            {/* Thumbnail */}
            <div className="col-span-2">
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded">
                    {isValidUrl(course.thumbnail || "") ? (
                        <Image
                            src={course.thumbnail!}
                            alt={course.title}
                            className="object-cover w-40"
                            fill
                            priority
                        />
                    ) : (
                        <div className="flex items-center w-full h-full justify-center rounded bg-muted text-sm text-muted-foreground">
                            No thumbnail
                        </div>
                    )}
                </AspectRatio>
            </div>

            <div className="col-span-4 flex flex-row justify-center items-center">
                {/* Title and Faculty */}
                <div className="flex flex-col justify-center items-start space-y-1">
                    <h2 className="text-sm font-semibold line-clamp-1">
                        {course.title}
                    </h2>
                    <CourseFacultyInfoCard
                        size="sm"
                        faculty={course.faculties?.[0] ?? null}
                    />
                </div>

                {/* Status Selector */}
                <div className="flex flex-row flex-1 items-center justify-end">
                    <Select
                        value={course.status}
                        onValueChange={(s) =>
                            updateMutation.mutate({ status: s as CourseStatus })
                        }
                        disabled={updateMutation.isPending}
                    >
                        <SelectTrigger size="sm" className="scale-75 min-w-20">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <CourseEdit
                        attempts={attempts}
                        categories={categories}
                        course={course}
                        faculties={faculties}
                        modes={modes}
                    />
                </div>
            </div>
        </div>
    );
}

export function CourseEditCardSkeleton() {
    return (
        <div className="grid grid-cols-6 bg-muted/50 border border-muted rounded-lg p-3 gap-4">
            {/* Thumbnail Skeleton */}
            <div className="col-span-2">
                <div className="aspect-video w-full rounded overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>
            </div>

            {/* Details Skeleton */}
            <div className="col-span-4 flex flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-start space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex flex-row gap-2 items-center justify-end">
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
        </div>
    );
}
