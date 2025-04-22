"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
    AdminCourseFormValues,
    AttemptType,
    CategoryType,
    FacultyType,
    ModeType,
} from "@/lib/types";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { Switch } from "@/components/ui/switch";

interface AdminCoursesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminCourseFormValues>;
    categories: CategoryType[];
    faculties: FacultyType[];
    attempts: AttemptType[];
    modes: ModeType[];
    uploadMutation: UseMutationResult<
        {
            url: string;
            success: boolean;
        },
        Error,
        File,
        unknown
    >;
    submitting?: boolean;
    onSubmit: (data: AdminCourseFormValues) => void;
}

export function AdminCoursesForm({
    formId,
    formProps,
    categories,
    faculties,
    attempts,
    modes,
    uploadMutation,
    submitting = false,
    onSubmit,
}: AdminCoursesFormProps) {
    const onFileSelect = (file: File) => {
        // Generate a temporary URL for preview.
        const preview = URL.createObjectURL(file);
        // Update the form value with the temporary URL.
        formProps.setValue("thumbnail", preview);
        // Trigger the image upload mutation
        uploadMutation.mutate(file);
    };

    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Course Thumbnail Field */}
                <FormField
                    control={formProps.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Faculty Picture</FormLabel>
                            <FormControl>
                                <ImageDropzone
                                    onFileSelect={(file) => onFileSelect(file)}
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
                                200x240 pixels.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        {/* Title Field */}
                        <FormField
                            control={formProps.control}
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
                            control={formProps.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={submitting}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
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
                                    </FormControl>
                                    <FormDescription>
                                        Category that best fits your course.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        {/* Faculties multi‑select */}
                        <FormField
                            control={formProps.control}
                            name="facultyIds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Faculties</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-4/6 lg:w-full justify-start"
                                                disabled={submitting}
                                            >
                                                {field.value.length} selected
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-80">
                                            <DropdownMenuLabel>
                                                Faculties
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <ScrollArea className="max-h-48 space-y-2 p-2">
                                                {faculties.map((f) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={f.id}
                                                        checked={field.value.includes(
                                                            f.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const next = checked
                                                                ? [
                                                                      ...field.value,
                                                                      f.id,
                                                                  ]
                                                                : field.value.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          f.id
                                                                  );
                                                            field.onChange(
                                                                next
                                                            );
                                                        }}
                                                    >
                                                        <CourseFacultyInfoCard
                                                            faculty={f}
                                                            size="sm"
                                                        />
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </ScrollArea>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormDescription>
                                        Choose one or more instructors.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Modes multi‑select */}
                    <FormField
                        control={formProps.control}
                        name="modeIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Modes</FormLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            disabled={submitting}
                                        >
                                            {field.value.length} selected
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-w-xs">
                                        <DropdownMenuLabel>
                                            Modes
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <ScrollArea className="max-h-48 space-y-2 p-2">
                                            {modes.map((m) => (
                                                <DropdownMenuCheckboxItem
                                                    key={m.id}
                                                    checked={field.value.includes(
                                                        m.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const next = checked
                                                            ? [
                                                                  ...field.value,
                                                                  m.id,
                                                              ]
                                                            : field.value.filter(
                                                                  (id) =>
                                                                      id !==
                                                                      m.id
                                                              );
                                                        field.onChange(next);
                                                    }}
                                                >
                                                    {m.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FormDescription>
                                    Choose one or more.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Attempts multi‑select */}
                    <FormField
                        control={formProps.control}
                        name="attemptIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Attempts</FormLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            disabled={submitting}
                                        >
                                            {field.value.length} selected
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-w-xs">
                                        <DropdownMenuLabel>
                                            Attempts
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <ScrollArea className="max-h-48 space-y-2 p-2">
                                            {attempts.map((a) => (
                                                <DropdownMenuCheckboxItem
                                                    key={a.id}
                                                    checked={field.value.includes(
                                                        a.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const next = checked
                                                            ? [
                                                                  ...field.value,
                                                                  a.id,
                                                              ]
                                                            : field.value.filter(
                                                                  (id) =>
                                                                      id !==
                                                                      a.id
                                                              );
                                                        field.onChange(next);
                                                    }}
                                                >
                                                    {a.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FormDescription>
                                    Choose at least one.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Numeric Fields: price, discountPrice, durationInMin */}
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={formProps.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Set the price for your course.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name="discountPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Discount Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Set the discount price (optional).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name="durationInMin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration (min)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Duration in minutes.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Toggles: onSale, featured */}
                <div className="flex gap-8">
                    <FormField
                        control={formProps.control}
                        name="onSale"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                                <FormLabel>On Sale</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-between">
                                <FormLabel>Featured</FormLabel>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Text Inputs: videoLanguage, courseMaterialLanguage, demoVideoUrl (all fields optional) */}
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={formProps.control}
                        name="videoLanguage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video Language</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Video lessons language (optional).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name="courseMaterialLanguage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Material Language</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Books language (optional).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={formProps.control}
                        name="demoVideoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Demo Video URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    Link of demo video (optional).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Description Field */}
                <FormField
                    control={formProps.control}
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
            </form>
        </Form>
    );
}
