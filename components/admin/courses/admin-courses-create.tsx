"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCoursesForm } from "@/components/admin/courses/admin-courses-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
    zCourseSchema,
} from "@/lib/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    createCourse,
    fetchAttempts,
    fetchCategories,
    fetchFaculties,
    fetchModes,
    uploadToBlob,
} from "@/lib/services/api";
import { useEffect, useState } from "react";

export function AdminCoursesCreate() {
    const queryClient = useQueryClient();
    const formId = "create-course-form";

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [faculties, setFaculties] = useState<FacultyType[]>([]);
    const [modes, setModes] = useState<ModeType[]>([]);
    const [attempts, setAttempts] = useState<AttemptType[]>([]);
    const [loading, setLoading] = useState(true);

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
            } catch {
                toast.error("Failed to load course metadata.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
    const mutation = useMutation<
        CourseType,
        Error,
        AdminCourseFormValues,
        unknown
    >({
        mutationFn: createCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course"] });

            toast.success("Course created successfully!");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating course failed", {
                description: error.message,
            });
        },
    });

    // thumbnail upload
    const uploadMutation = useMutation<
        { url: string; success: boolean },
        Error,
        File,
        unknown
    >({
        mutationFn: (file) => uploadToBlob(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Course thumbnail successfully uploaded");
            // Optionally update the form field with the new permanent URL after upload completes.
            form.setValue("thumbnail", uploadedUrl.url.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Combined loading state: disable submit if profile update or image upload is pending.
    const submitting = mutation.isPending || uploadMutation.isPending;

    // Form submission handler.
    const onSubmit = (data: AdminCourseFormValues) => {
        mutation.mutate(data);
    };

    if (loading)
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="h-6 w-48 bg-muted rounded animate-pulse" />
                    <CardDescription className="mt-2 h-4 w-72 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Simulating form inputs */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                            <div className="h-10 w-full bg-muted rounded animate-pulse" />
                        </div>
                    ))}

                    {/* Submit Button Skeleton */}
                    <div className="flex justify-end pt-4">
                        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                    </div>
                </CardContent>
            </Card>
        );

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
                    categories={categories}
                    faculties={faculties}
                    attempts={attempts}
                    modes={modes}
                    uploadMutation={uploadMutation}
                    submitting={submitting}
                    onSubmit={onSubmit}
                />

                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button
                        form={formId}
                        type="submit"
                        disabled={!form.formState.isDirty || submitting}
                    >
                        {submitting ? "Creating..." : "Create Course"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
