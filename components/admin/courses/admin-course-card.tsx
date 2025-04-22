"use client";

import Image from "next/image";
import { AdminCourseEdit } from "@/components/admin/courses/admin-course-edit";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { AdminCourseStatusSelect } from "@/components/admin/courses/admin-course-status";
import {
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
} from "@/lib/types";
import { isValidUrl } from "@/lib/utils";

interface AdminCourseCardProps {
    course: CourseType;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
}

export function AdminCourseCard({
    course,
    categories,
    faculties,
    attempts,
    modes,
}: AdminCourseCardProps) {
    const thumbnailUrl = isValidUrl(course.thumbnail || "")
        ? course.thumbnail
        : null;

    return (
        <div className="flex flex-row sm:items-center gap-4 bg-gradient-to-br from-primary/5 via-white dark:via-black to-transparent border border-muted rounded-lg p-3">
            {thumbnailUrl ? (
                <div className="shrink-0 relative w-32 h-20 rounded overflow-hidden bg-muted">
                    <Image
                        src={thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : (
                <div className="shrink-0 flex w-32 h-20 items-center justify-center rounded bg-muted text-sm text-muted-foreground">
                    No thumbnail
                </div>
            )}

            <div className="flex flex-col justify-center items-start space-y-1">
                <h2 className="text-sm font-semibold line-clamp-1 max-w-[200px]">
                    {course.title}
                </h2>
                <CourseFacultyInfoCard
                    size="sm"
                    faculty={course.faculties?.[0] ?? null}
                />
            </div>

            <div className="flex flex-1 items-center justify-end">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <AdminCourseStatusSelect
                        courseSlug={course.slug}
                        currentStatus={course.status}
                    />
                    <AdminCourseEdit
                        course={course}
                        categories={categories}
                        faculties={faculties}
                        attempts={attempts}
                        modes={modes}
                    />
                </div>
            </div>
        </div>
    );
}
