"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageDropzone } from "@/components/ui/image-drop-zone";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AttemptType, CategoryType, FacultyType, ModeType } from "@/lib/types";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";

/**
 * Zod schema for course validation.
 * - title: required non-empty string.
 * - description: optional string.
 * - thumbnail: optional string.
 * - price: required now-empty number.
 * - discountPrice: required now-empty number.
 * - onSale: boolean.
 * - durationInMin: required now-empty number.
 * - featured: boolean.
 * - videoLanguage: optional string.
 * - courseMaterialLanguage: optional string.
 * - demoVideoUrl: optional string.
 */
const courseSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters" }),
    categoryId: z
        .string()
        .min(3, { message: "Category ID must be at least 3 characters" }),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    facultyIds: z
        .array(z.string())
        .min(1, { message: "Select at least one faculty" }),
    modeIds: z
        .array(z.string())
        .min(1, { message: "Select at least one mode" }),
    attemptIds: z
        .array(z.string())
        .min(1, { message: "Select at least one attempt" }),
});

type AdminCourseFormValues = z.infer<typeof courseSchema>;

/**
 * Uploads a file (profile image) and returns its URL.
 * @param file - The file to upload.
 */
async function uploadFile(file: File): Promise<URL> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file.");
    }

    const data: {
        url: string;
        success: boolean;
    } = await response.json();
    return new URL(data.url); // return the public URL as a URL object
}

/**
 * Create new course.
 * @param data - Data for creating new course.
 */
async function createNewCourse(
    data: AdminCourseFormValues
): Promise<AdminCourseFormValues> {
    const response = await fetch("/api/courses", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create course");
    }
    return response.json();
}

interface AdminCoursesFormProps {
    categories: CategoryType[];
    faculties: FacultyType[];
    modes: ModeType[];
    attempts: AttemptType[];
}

export function AdminCoursesForm({
    categories,
    faculties,
    modes,
    attempts,
}: AdminCoursesFormProps) {
    const queryClient = useQueryClient();

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminCourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            description: "",
            thumbnail: "",
            facultyIds: [],
            modeIds: [],
            attemptIds: [],
        },
    });

    // Mutation hook for creating course.
    const mutation = useMutation<
        AdminCourseFormValues,
        Error,
        AdminCourseFormValues,
        unknown
    >({
        mutationFn: createNewCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course"] });

            toast.success("Course created successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating course failed", {
                description: error.message,
            });
        },
    });

    // Mutation for uploading course thumbnail.
    const uploadCourseThumbnail = useMutation<URL, Error, File, unknown>({
        mutationFn: (file) => uploadFile(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Course thumbnail successfully uploaded");
            // Optionally update the form field with the new permanent URL after upload completes.
            form.setValue("thumbnail", uploadedUrl.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Handler for course thumbnail selection.
    const onCourseThumbnailSelect = async (
        file: File,
        field: ControllerRenderProps<AdminCourseFormValues, "thumbnail">
    ) => {
        // Generate a temporary URL for preview.
        const preview = URL.createObjectURL(file);
        // Update the form field with the temporary URL.
        field.onChange(preview);
        // Trigger the image upload mutation.
        uploadCourseThumbnail.mutate(file);
    };

    // Combined loading state: disable submit if profile update or image upload is pending.
    const isSubmitDisabled =
        mutation.isPending || uploadCourseThumbnail.isPending;

    // Form submission handler.
    const onSubmit = (data: AdminCourseFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Course Thumbnail Field */}
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Faculty Picture</FormLabel>
                            <FormControl>
                                <ImageDropzone
                                    onFileSelect={(file) =>
                                        onCourseThumbnailSelect(file, field)
                                    }
                                    className="w-full h-60 cursor-pointer"
                                    placeholder={
                                        field.value ? (
                                            <Image
                                                src={field.value}
                                                alt={"NaN"}
                                                fill
                                                className="object-cover w-full h-full rounded"
                                            />
                                        ) : undefined
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Upload a faculty picture. Recommended size:
                                200x200 pixels.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        {/* Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. 'Advanced Web Development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The title of your course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        {/* Category selector */}
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isSubmitDisabled}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select the category that best fits your
                                        course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                    <div className="lg:col-span-1">
                        {/* Faculties Selector */}
                        <FormField
                            control={form.control}
                            name="facultyIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Faculties</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-start"
                                                disabled={isSubmitDisabled}
                                            >
                                                {field.value.length > 0
                                                    ? `${field.value.length} selected`
                                                    : "Select faculties"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-fit">
                                            <DropdownMenuLabel>
                                                Faculties
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <ScrollArea className="max-h-60 space-y-2">
                                                {faculties.map((faculty) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={faculty.id}
                                                        id={`faculty-${faculty.id}`}
                                                        checked={field.value.includes(
                                                            faculty.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const next = checked
                                                                ? [
                                                                      ...field.value,
                                                                      faculty.id,
                                                                  ]
                                                                : field.value.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          faculty.id
                                                                  );
                                                            field.onChange(
                                                                next
                                                            );
                                                        }}
                                                    >
                                                        <CourseFacultyInfoCard
                                                            faculty={faculty}
                                                            size="sm"
                                                        />
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </ScrollArea>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormDescription>
                                        Choose one or more
                                        instructors(faculties).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        {/* Attempt Selector */}
                        <FormField
                            control={form.control}
                            name="attemptIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attempts</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-start"
                                                disabled={isSubmitDisabled}
                                            >
                                                {field.value.length > 0
                                                    ? `${field.value.length} selected`
                                                    : "Select attempts"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-fit">
                                            <DropdownMenuLabel>
                                                Attempt
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <ScrollArea className="max-h-60 space-y-2">
                                                {attempts.map((attempt) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={attempt.id}
                                                        id={`attempt-${attempt.id}`}
                                                        checked={field.value.includes(
                                                            attempt.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const next = checked
                                                                ? [
                                                                      ...field.value,
                                                                      attempt.id,
                                                                  ]
                                                                : field.value.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          attempt.id
                                                                  );
                                                            field.onChange(
                                                                next
                                                            );
                                                        }}
                                                    >
                                                        {attempt.name}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </ScrollArea>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormDescription>
                                        Choose one or more attempts.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        {/* Mode Selector */}
                        <FormField
                            control={form.control}
                            name="modeIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Modes</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-start"
                                                disabled={isSubmitDisabled}
                                            >
                                                {field.value.length > 0
                                                    ? `${field.value.length} selected`
                                                    : "Select modes"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-fit">
                                            <DropdownMenuLabel>
                                                Mode
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <ScrollArea className="max-h-60 space-y-2">
                                                {modes.map((mode) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={mode.id}
                                                        id={`attempt-${mode.id}`}
                                                        checked={field.value.includes(
                                                            mode.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const next = checked
                                                                ? [
                                                                      ...field.value,
                                                                      mode.id,
                                                                  ]
                                                                : field.value.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          mode.id
                                                                  );
                                                            field.onChange(
                                                                next
                                                            );
                                                        }}
                                                    >
                                                        {mode.name}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </ScrollArea>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormDescription>
                                        Choose one or more modes.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Description Field */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-y min-h-24"
                                    placeholder="Tell us a little about course"
                                    {...field}
                                    // Ensure that if field.value is null or undefined, we use an empty string.
                                    // value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a detailed description of your course.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitDisabled}>
                        {isSubmitDisabled ? "Creating..." : "Create Course"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
