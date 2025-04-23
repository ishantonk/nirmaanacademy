"use client";

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminCourseCard } from "@/components/admin/courses/admin-course-card";
import {
    fetchAdminCourses,
    fetchAttempts,
    fetchCategories,
    fetchFaculties,
    fetchModes,
} from "@/lib/services/api";
import {
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function AdminCoursesList() {
    const {
        data: courses,
        isLoading: coursesLoading,
        isError: coursesError,
    } = useQuery<CourseType[]>({
        queryKey: ["course"],
        queryFn: fetchAdminCourses,
    });

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [faculties, setFaculties] = useState<FacultyType[]>([]);
    const [modes, setModes] = useState<ModeType[]>([]);
    const [attempts, setAttempts] = useState<AttemptType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cat, fac, mode, attempt] = await Promise.all([
                    fetchCategories(),
                    fetchFaculties(),
                    fetchModes(),
                    fetchAttempts(),
                ]);
                setCategories(cat);
                setFaculties(fac);
                setModes(mode);
                setAttempts(attempt);
            } catch (error) {
                setError(!!error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const isLoading = coursesLoading || loading;
    const isError = coursesError || error;

    if (isLoading) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <CardDescription>
                        Loading courses, please wait...
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="space-y-2 p-4 border rounded-lg"
                                >
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <div className="text-center text-red-500">
                        Failed to load courses. Please try again later.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Courses</CardTitle>
                <CardDescription>List of all the courses.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-14rem)] p-0">
                {courses && courses.length ? (
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <AdminCourseCard
                                    key={course.id}
                                    course={course}
                                    categories={categories || []}
                                    faculties={faculties || []}
                                    attempts={attempts || []}
                                    modes={modes || []}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        icon={BookOpen}
                        title="No Courses Yet — But the Future Awaits"
                        description="Your course catalog is currently empty. Start shaping minds by creating your very first course today!"
                    />
                )}
            </CardContent>
        </Card>
    );
}
