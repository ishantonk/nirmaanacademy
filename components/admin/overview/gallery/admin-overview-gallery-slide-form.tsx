"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AdminGalleryFormValues } from "@/lib/types";
import { Link, Upload } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { ImageDropzone } from "@/components/ui/image-drop-zone";
import Image from "next/image";

interface AdminGalleryFormProps {
    formId: string;
    formProps: UseFormReturn<AdminGalleryFormValues>;
    uploadMutation: UseMutationResult<
        {
            url: string;
            success: boolean;
        },
        Error,
        File,
        unknown
    >;
    onSubmit: (data: AdminGalleryFormValues) => void;
}

export function AdminGallerySlideForm({
    formId,
    formProps,
    uploadMutation,
    onSubmit,
}: AdminGalleryFormProps) {
    // Watch the `type` field to conditionally show URL or file input
    const slideType = formProps.watch("type");
    const [imageMode, setImageMode] = useState<"url" | "upload">("url");

    const onFileSelect = (file: File) => {
        // Generate a temporary URL for preview.
        const preview = URL.createObjectURL(file);
        // Update the form value with the temporary URL.
        formProps.setValue("imageUrl", preview);
        // Trigger the image upload mutation
        uploadMutation.mutate(file);
    };

    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6 m-2"
            >
                {/* Slide Type */}
                <FormField
                    control={formProps.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slide Type</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IMAGE">
                                            Image
                                        </SelectItem>
                                        <SelectItem value="VIDEO">
                                            Video
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Title */}
                <FormField
                    control={formProps.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Optional title"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Up to 100 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Subtitle */}
                <FormField
                    control={formProps.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Optional subtitle"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Up to 200 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* IMAGE: URL or Upload */}
                {slideType === "IMAGE" && (
                    <>
                        {/* Mode Toggle */}
                        <FormItem>
                            <FormLabel>Image Source</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    size={"lg"}
                                    variant={"outline"}
                                    type="single"
                                    value={imageMode}
                                    onValueChange={(value) =>
                                        value &&
                                        setImageMode(value as "url" | "upload")
                                    }
                                >
                                    <ToggleGroupItem value="url">
                                        <Link />
                                        URL
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="upload">
                                        <Upload />
                                        Upload
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </FormControl>
                        </FormItem>

                        {imageMode === "url" ? (
                            <FormField
                                control={formProps.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="https://example.com/image.jpg"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter a valid image URL.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField
                                control={formProps.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Upload Image</FormLabel>
                                        <FormControl>
                                            <ImageDropzone
                                                onFileSelect={(file) =>
                                                    onFileSelect(file)
                                                }
                                                className="w-full h-60 cursor-pointer"
                                                placeholder={
                                                    field.value ? (
                                                        <Image
                                                            src={field.value}
                                                            alt={
                                                                "Preview image"
                                                            }
                                                            fill
                                                            className="object-cover w-full h-full rounded"
                                                        />
                                                    ) : undefined
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Choose an image file to upload.
                                            Recommended size: 800x600 pixels.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </>
                )}

                {/* VIDEO: URL only */}
                {slideType === "VIDEO" && (
                    <FormField
                        control={formProps.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com/video.mp4"
                                        {...field}
                                        value={field.value ?? ""}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter a valid video URL.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Sort Order */}
                <FormField
                    control={formProps.control}
                    name="sortOrder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    value={field.value ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        field.onChange(
                                            val === ""
                                                ? undefined
                                                : parseInt(val, 10)
                                        );
                                    }}
                                    onBlur={field.onBlur}
                                />
                            </FormControl>
                            <FormDescription>
                                Determines slide ordering (0 = first).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Visible Switch */}
                <FormField
                    control={formProps.control}
                    name="visible"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                            <FormLabel className="mb-0">Visible</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value ?? false}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
