"use client";

import { AlertCircle, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CourseEditCard,
    CourseEditCardSkeleton,
} from "@/components/layout/card/course-edit-card";
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

export function AdminCoursesList() {
    const { data, isLoading, isError, refetch } = useQuery<{
        courses: CourseType[];
        categories: CategoryType[];
        faculties: FacultyType[];
        modes: ModeType[];
        attempts: AttemptType[];
    }>({
        queryKey: ["courses", "categories", "faculty", "modes", "attempts"],
        queryFn: async () => {
            const [courses, categories, faculties, modes, attempts] =
                await Promise.all([
                    fetchAdminCourses(),
                    fetchCategories(),
                    fetchFaculties(),
                    fetchModes(),
                    fetchAttempts(),
                ]);
            return { courses, categories, faculties, modes, attempts };
        },
    });

    if (isLoading) return <CourseListSkeleton />;

    if (isError) return <CourseListError onRetry={refetch} />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Courses</CardTitle>
                <CardDescription>
                    View, edit, and organize your course catalog efficiently.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                {data?.courses && data?.courses.length ? (
                    <ScrollArea showShadow className="h-[calc(100vh-14rem)]">
                        <div className="space-y-4 px-6">
                            {data?.courses.map((course) => (
                                <CourseEditCard
                                    key={course.id}
                                    course={course}
                                    attempts={data.attempts}
                                    categories={data.categories}
                                    faculties={data.faculties}
                                    modes={data.modes}
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

function CourseListSkeleton() {
    return (
        <Card aria-busy="true" aria-label="Loading course list">
            <CardHeader>
                <CardTitle>Getting Your Courses Ready</CardTitle>
                <CardDescription>
                    Hang tight — this won’t take long!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <CourseEditCardSkeleton key={idx} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function CourseListError({ onRetry }: { onRetry?: () => void }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Oops! Something Went Wrong</CardTitle>
                <CardDescription>
                    We ran into an issue while loading your course data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Unable to Load Course Information</AlertTitle>
                    <AlertDescription>
                        {" "}
                        We couldn’t retrieve the data required to display your
                        courses. This might be due to a network issue or a
                        temporary server problem. Please try again or check your
                        connection.
                    </AlertDescription>
                </Alert>
            </CardContent>

            <CardFooter className="justify-end">
                {onRetry && (
                    <Button variant="outline" onClick={onRetry}>
                        Retry
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
