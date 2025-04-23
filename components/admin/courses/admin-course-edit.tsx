"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil } from "lucide-react";
import { AdminCoursesForm } from "@/components/admin/courses/admin-courses-form";
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
    zCourseSchema,
} from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { removeCourse, updateCourse, uploadToBlob } from "@/lib/services/api";

interface AdminCourseEditProps {
    course: CourseType;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
}

export function AdminCourseEdit({
    course,
    attempts,
    categories,
    faculties,
    modes,
}: AdminCourseEditProps) {
    const queryClient = useQueryClient();
    const formId = "edit-course-form";

    // seed defaultValues from `course` if it exists
    const form = useForm<AdminCourseFormValues>({
        resolver: zodResolver(zCourseSchema),
        defaultValues: {
            title: course?.title ?? "",
            categoryId: course?.categoryId ?? "",
            facultyIds: course?.faculties?.map((f) => f.id) ?? [],
            modeIds: course?.availableModes?.map((m) => m.id) ?? [],
            attemptIds: course?.availableAttempts?.map((a) => a.id) ?? [],
            price: Number(course?.price ?? 0),
            discountPrice:
                course?.discountPrice != null
                    ? Number(course.discountPrice)
                    : undefined,
            onSale: course?.onSale ?? false,
            durationInMin: course?.durationInMin ?? 1,
            featured: course?.featured ?? false,
            videoLanguage: course?.videoLanguage ?? "",
            courseMaterialLanguage: course?.courseMaterialLanguage ?? "",
            demoVideoUrl: course?.demoVideoUrl ?? "",
            description: course?.description ?? "",
            thumbnail: course?.thumbnail ?? "",
        },
    });

    // Mutation hook for editing course.
    const mutation = useMutation<
        CourseType,
        Error,
        AdminCourseFormValues,
        unknown
    >({
        mutationFn: (data) => updateCourse(course.slug, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });

            toast.success("Course update successfully!");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Updating course failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
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

    const handleRemoveCourse = async (courseSlug: string) => {
        try {
            await removeCourse(courseSlug);
            toast.success("Course deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        } catch (error) {
            toast.error("Failed to remove course", {
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            });
        }
    };

    // Form submission handler.
    const onSubmit = (data: AdminCourseFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant={"ghost"} aria-label="Edit course">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            {/* Give the dialog a viewport‑relative height and hide overflow */}
            <DialogContent className="p-0 py-6 w-screen md:max-w-xl lg:max-w-4xl h-[calc(100vh-4rem)]">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit course</DialogTitle>
                    <DialogDescription>
                        Make changes to your course below.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative flex flex-col overflow-hidden">
                    <ScrollArea showShadow className="flex-1 h-full px-6 py-1">
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
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => handleRemoveCourse(course.slug)}
                        >
                            Delete Course
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        {/* Submit Button */}
                        <Button
                            form={formId}
                            type="submit"
                            disabled={!form.formState.isDirty || submitting}
                        >
                            {submitting ? "Updating..." : "Update Course"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
