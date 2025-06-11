"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCoursesForm } from "@/components/admin/courses/admin-courses-form";
import { useQuery } from "@tanstack/react-query";
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
    zCourseSchema,
} from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    createCourse,
    fetchAttempts,
    fetchCategories,
    fetchFaculties,
    fetchModes,
} from "@/lib/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EditorMenuBar } from "@/components/layout/form/rich-text-editor-field";

export function AdminCoursesCreate() {
    const formId = "create-course-form";

    const { data, isLoading, isError, refetch } = useQuery<{
        categories: CategoryType[];
        faculties: FacultyType[];
        modes: ModeType[];
        attempts: AttemptType[];
    }>({
        queryKey: ["categories", "faculty", "modes", "attempts"],
        queryFn: async () => {
            const [categories, faculties, modes, attempts] = await Promise.all([
                fetchCategories(),
                fetchFaculties(),
                fetchModes(),
                fetchAttempts(),
            ]);
            return { categories, faculties, modes, attempts };
        },
    });

    // seed defaultValues
    const form = useForm<AdminCourseFormValues>({
        resolver: zodResolver(zCourseSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            facultyIds: [],
            modeIds: [],
            attemptIds: [],
            price: 0,
            discountPrice: undefined,
            onSale: false,
            durationInMin: 1,
            featured: false,
            videoLanguage: "",
            courseMaterialLanguage: "",
            demoVideoUrl: "",
            description: "",
            thumbnail: "",
        },
    });

    // Mutation hook for creating course.
    const createMutation = useGenericMutation<
        CourseType,
        AdminCourseFormValues
    >({
        mutationFn: createCourse,
        action: "create",
        entityName: "Course",
        queryKeyToInvalidate: ["courses"],
        form: form,
    });

    // Form submission handler.
    const onSubmit = (data: AdminCourseFormValues) => {
        createMutation.mutate(data);
    };

    if (isLoading) return <AdminCourseCreateSkeleton />;

    if (isError) return <AdminCourseCreateError onRetry={refetch} />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new course</CardTitle>
                <CardDescription>
                    Add new course for Nirmaan Academy.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminCoursesForm
                    formId={formId}
                    formProps={form}
                    categories={data?.categories ?? []}
                    faculties={data?.faculties ?? []}
                    attempts={data?.attempts ?? []}
                    modes={data?.modes ?? []}
                    onSubmit={onSubmit}
                />
            </CardContent>
            <CardFooter className="justify-end">
                {/* Submit Button */}
                <Button
                    form={formId}
                    type="submit"
                    aria-busy={createMutation.isPending}
                    disabled={
                        !form.formState.isDirty ||
                        !form.formState.isValid ||
                        createMutation.isPending
                    }
                >
                    {createMutation.isPending ? "Creating..." : "Create Course"}
                </Button>
            </CardFooter>
        </Card>
    );
}

function AdminCourseCreateSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Creating Course… Hold Tight!</CardTitle>
                <CardDescription>
                    We're getting things ready. Just a moment!
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Simulated input fields */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}

                {/* Simulated textarea or multiselect */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full" />
                </div>
            </CardContent>

            <CardFooter className="justify-end">
                <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    );
}

function AdminCourseCreateError({ onRetry }: { onRetry?: () => void }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Something went wrong</CardTitle>
                <CardDescription>
                    We couldn’t load the course creation form.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Error loading data</AlertTitle>
                    <AlertDescription>
                        There was a problem fetching categories, faculties,
                        modes, or attempts. Please check your connection or try
                        again.
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
