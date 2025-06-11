"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { IconImagePicker } from "@/components/ui/icon-image-picker";
import { getInitials, humanize } from "@/lib/utils";
import { UseMutationResult } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
    Control,
    ControllerRenderProps,
    FieldValues,
    Path,
} from "react-hook-form";

interface AvatarFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    avatarName?: string;
    initialsSize?: string;
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

export function AvatarField<TFieldValues extends FieldValues>({
    name,
    avatarName,
    initialsSize = "text-2xl",
    label = name,
    description = "",
    control,
    uploadMutation,
    isRequired = false,
    className = "h-28 w-28 border border-muted",
}: AvatarFieldProps<TFieldValues>) {
    label = humanize(label);

    const isUploading = uploadMutation.isPending;
    const isError = uploadMutation.isError;
    avatarName =
        avatarName === "" || avatarName === undefined
            ? "Anonymous User"
            : avatarName;

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
                        <div className="relative w-fit h-fit">
                            <Avatar className={className}>
                                <AvatarImage
                                    {...field}
                                    className="object-cover"
                                    src={field.value || undefined}
                                />
                                <AvatarFallback className={initialsSize}>
                                    {getInitials(avatarName)}
                                </AvatarFallback>
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/50 z-10">
                                        <div className="flex items-center justify-center h-full w-full">
                                            <Loader2 className="animate-spin text-white dark:text-muted-foreground" />
                                            <span className="text-white ml-2 text-sm font-semibold dark:text-muted-foreground drop-shadow-sm">
                                                Uploading...
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {isError && (
                                    <div className="absolute inset-0 bg-black/50 z-10">
                                        <div className="flex items-center justify-center h-full w-full">
                                            <AlertTriangle className="text-destructive animate-caret-blink" />
                                            <span className="text-destructive ml-2 text-sm font-semibold drop-shadow-sm">
                                                Upload failed
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </Avatar>
                            <IconImagePicker
                                className="absolute bottom-2 -right-2"
                                onImageSelect={(file) =>
                                    onFileSelect(file, field)
                                }
                            />
                        </div>
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
