"use client";

import { useState } from "react";
import { FormGeneric } from "@/components/layout/form/form-generic";
import { SelectField } from "@/components/layout/form/select-field";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { TextField } from "@/components/layout/form/text-field";
import { AdminGalleryFormValues } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";
import { Toggle } from "@/components/ui/toggle";
import { Link, Upload } from "lucide-react";
import { ImageField } from "@/components/layout/form/image-field";
import { useUploadMutation } from "@/hooks/use-upload-mutation";
import { SwitchField } from "@/components/layout/form/switch-field";

interface AdminGalleryFormProps {
    formId: string;
    formProps: UseFormReturn<AdminGalleryFormValues>;
    onSubmit: (data: AdminGalleryFormValues) => void;
}

export function AdminGalleryForm({
    formId,
    formProps,
    onSubmit,
}: AdminGalleryFormProps) {
    // Manage the image source selection (URL or Upload) using state
    const [imageSource, setImageSource] = useState<"URL" | "UPLOAD">("UPLOAD");

    const uploadMutation = useUploadMutation({
        entityName: "Gallery slide image",
        form: formProps,
        field: "imageUrl",
    });

    return (
        <FormGeneric formId={formId} form={formProps} onSubmit={onSubmit}>
            {/* Slide Type Field */}
            <SelectField
                control={formProps.control}
                name="type"
                selectOptions={[
                    { label: "Image", value: "IMAGE" },
                    { label: "Video", value: "VIDEO" },
                ]}
                description="Choose whether this slide is an image or a video."
            />

            {/* Title Field */}
            <TextField
                control={formProps.control}
                name="title"
                placeholder="Enter title"
                description="The title of the gallery slide."
            />

            {/* Subtitle Field */}
            <TextAreaField
                control={formProps.control}
                name="subtitle"
                placeholder="Enter subtitle"
                description="Subtitle for the gallery slide (up to 200 characters)."
            />

            {/* Conditionally Render Video URL Field if Type is Video */}
            {formProps.watch("type") === "VIDEO" && (
                <TextField
                    control={formProps.control}
                    name="videoUrl"
                    placeholder="Enter video URL"
                    description="Provide the URL of the video for the gallery slide."
                />
            )}

            {/* Conditionally Render Image Source Selection if Type is Image */}
            {formProps.watch("type") === "IMAGE" && (
                <>
                    {/* Image Source Toggle */}
                    <div className="space-y-2">
                        <h5 className="text-sm font-medium">Image Source</h5>
                        <div className="flex gap-2">
                            <Toggle
                                aria-label="Upload"
                                pressed={imageSource === "UPLOAD"}
                                onPressedChange={() => setImageSource("UPLOAD")}
                            >
                                <Upload className="h-4 w-4 mr-1" />
                                Upload
                            </Toggle>
                            <Toggle
                                aria-label="URL"
                                pressed={imageSource === "URL"}
                                onPressedChange={() => setImageSource("URL")}
                            >
                                <Link className="h-4 w-4 mr-1" />
                                URL
                            </Toggle>
                        </div>
                    </div>

                    {/* Conditionally render image input */}
                    {imageSource === "URL" ? (
                        <TextField
                            control={formProps.control}
                            name="imageUrl"
                            placeholder="Enter image URL"
                            description="Provide the URL of the image for the gallery slide."
                            isRequired
                        />
                    ) : (
                        <ImageField
                            control={formProps.control}
                            name="imageUrl"
                            description="Choose an image file to upload. Recommended size: 800x600 pixels."
                            uploadMutation={uploadMutation}
                            isRequired
                        />
                    )}
                </>
            )}

            {/* Sort Order Field */}
            <TextField
                type="number"
                control={formProps.control}
                name="sortOrder"
                description="Determines slide ordering (0 = first)."
                isRequired
            />

            {/* Visible Field */}
            <SwitchField
                control={formProps.control}
                name="visible"
                description="Toggle to show or hide this slide in the gallery."
            />
        </FormGeneric>
    );
}
