"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ImageDropzone } from "@/components/ui/image-drop-zone";
import { humanize } from "@/lib/utils";
import { UseMutationResult } from "@tanstack/react-query";
import Image from "next/image";
import {
    Control,
    ControllerRenderProps,
    FieldValues,
    Path,
} from "react-hook-form";

interface ImageFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    description?: string;
    control: Control<TFieldValues>;
    uploadMutation: UseMutationResult<
        { url: string; success: boolean },
        Error,
        File,
        unknown
    >;
    isRequired?: boolean;
    className?: string;
}

export function ImageField<TFieldValues extends FieldValues>({
    name,
    label = humanize(name),
    description = "",
    control,
    uploadMutation,
    isRequired = false,
    className,
}: ImageFieldProps<TFieldValues>) {
    const isUploading = uploadMutation.isPending;
    const isError = uploadMutation.isError;

    const onFileSelect = (
        file: File,
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    ) => {
        const preview = URL.createObjectURL(file);
        // Set the preview URL to the form state
        field.onChange(preview);
        // Upload the file
        uploadMutation.mutate(file);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel htmlFor={name}>
                        {label}
                        {!isRequired && (
                            <span className="text-muted-foreground">
                                (optional)
                            </span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <AspectRatio ratio={16 / 9}>
                            <ImageDropzone
                                onFileSelect={(file) =>
                                    onFileSelect(file, field)
                                }
                                isError={isError}
                                isUploading={isUploading}
                                placeholder={
                                    field.value ? (
                                        <Image
                                            src={field.value}
                                            alt="Featured Image"
                                            fill
                                            className="object-cover w-full h-full rounded"
                                        />
                                    ) : undefined
                                }
                                className={className}
                            />
                        </AspectRatio>
                    </FormControl>
                    {fieldState.error ? (
                        // If there’s an error, show it here instead of the description
                        <FormMessage />
                    ) : (
                        // Otherwise show the normal helper text
                        description && (
                            <FormDescription>{description}</FormDescription>
                        )
                    )}
                </FormItem>
            )}
        />
    );
}
