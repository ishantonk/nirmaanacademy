"use client";

import { AdminCoursesForm } from "@/components/admin/courses/admin-courses-form";
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
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { removeCourse, updateCourse } from "@/lib/services/api";
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    CourseType,
    FacultyType,
    ModeType,
    zCourseSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

interface CourseEditProps {
    course: CourseType;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
}

export function CourseEdit({
    course,
    attempts,
    categories,
    faculties,
    modes,
}: CourseEditProps) {
    const formId = "edit-course-form";
    const formDefaultValues = {
        ...course,
        facultyIds: course?.faculties?.map((f) => f.id) ?? [],
        modeIds: course?.availableModes?.map((m) => m.id) ?? [],
        attemptIds: course?.availableAttempts?.map((a) => a.id) ?? [],
        price: Number(course.price),
        discountPrice:
            course.discountPrice != null
                ? Number(course.discountPrice)
                : undefined,
        description: course.description ?? undefined,
        thumbnail: course.thumbnail ?? undefined,
        videoLanguage: course.videoLanguage ?? undefined,
        courseMaterialLanguage: course.courseMaterialLanguage ?? undefined,
        demoVideoUrl: course.demoVideoUrl ?? undefined,
    };

    // seed defaultValues from `course` if it exists
    const form = useForm<AdminCourseFormValues>({
        resolver: zodResolver(zCourseSchema),
        defaultValues: formDefaultValues,
    });

    // Mutation hook for editing course.
    const updateMutation = useGenericMutation<
        CourseType,
        AdminCourseFormValues
    >({
        mutationFn: (data) => updateCourse(course.slug, data),
        action: "update",
        entityName: "Course",
        queryKeyToInvalidate: ["courses"],
        onSuccess: (data) => {
            form.reset({
                ...data,
                price: Number(data.price),
                discountPrice:
                    data.discountPrice != null
                        ? Number(data.discountPrice)
                        : undefined,
                description: data.description ?? undefined,
                thumbnail: data.thumbnail ?? undefined,
                videoLanguage: data.videoLanguage ?? undefined,
                courseMaterialLanguage:
                    data.courseMaterialLanguage ?? undefined,
                demoVideoUrl: data.demoVideoUrl ?? undefined,
                facultyIds: data.faculties?.map((f) => f.id) ?? [],
                attemptIds: data.availableAttempts.map((a) => a.id) ?? [],
                modeIds: data.availableModes.map((m) => m.id) ?? [],
            });
        },
    });

    const removeMutation = useGenericMutation<
        CourseType,
        AdminCourseFormValues & { slug: string }
    >({
        mutationFn: ({ slug }) => removeCourse(slug),
        action: "update",
        entityName: "Course",
        queryKeyToInvalidate: ["courses"],
    });

    // Form submission handler.
    const onSubmit = (data: AdminCourseFormValues) => {
        updateMutation.mutate(data);
    };

    const onDelete = () => {
        removeMutation.mutate({ ...form.getValues(), slug: course.slug });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset(formDefaultValues)}
                    size="icon"
                    variant="outline"
                    aria-label="Edit Course"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="px-0 md:max-w-lg lg:max-w-2xl">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>
                        Make changes to your course below.
                    </DialogDescription>
                </DialogHeader>

                <div className="h-96 overflow-hidden">
                    <ScrollArea showShadow className="px-4 h-full">
                        <AdminCoursesForm
                            formId={formId}
                            formProps={form}
                            categories={categories}
                            faculties={faculties}
                            attempts={attempts}
                            modes={modes}
                            onSubmit={onSubmit}
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={removeMutation.isPending}
                        >
                            {removeMutation.isPending
                                ? "Removing..."
                                : "Delete Course"}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty ||
                                updateMutation.isPending
                            }
                        >
                            {updateMutation.isPending
                                ? "Updating..."
                                : "Update Course"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
