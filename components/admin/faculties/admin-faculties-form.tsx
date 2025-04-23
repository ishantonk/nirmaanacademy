"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { IconImagePicker } from "@/components/ui/icon-image-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getInitials } from "@/lib/utils";
import { AdminFacultyFormValues } from "@/lib/types";
import { toast } from "sonner";

interface AdminFacultiesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminFacultyFormValues>;
    uploadMutation: UseMutationResult<
        {
            url: string;
            success: boolean;
        },
        Error,
        File,
        unknown
    >;
    onSubmit: (data: AdminFacultyFormValues) => void;
    isEdit?: boolean;
}

export function AdminFacultiesForm({
    formId,
    formProps,
    uploadMutation,
    onSubmit,
    isEdit = false,
}: AdminFacultiesFormProps) {
    const onFileSelect = (file: File) => {
        // Generate a temporary URL for preview.
        const preview = URL.createObjectURL(file);
        // Update the form value with the temporary URL.
        formProps.setValue("image", preview);
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
                {/* Faculty Image Field */}
                <FormField
                    control={formProps.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Faculty Picture</FormLabel>
                            <FormControl>
                                <div className="relative max-w-fit max-h-fit">
                                    <Avatar className="h-28 w-28 border">
                                        <AvatarImage
                                            {...field}
                                            className="object-cover"
                                            src={field.value || undefined}
                                        />
                                        <AvatarFallback className="text-2xl">
                                            {formProps.getValues().name
                                                ? getInitials(
                                                      formProps.getValues().name
                                                  )
                                                : "NA"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <IconImagePicker
                                        // {...field}
                                        className="absolute bottom-2 -right-2"
                                        onImageSelect={(file) =>
                                            onFileSelect(file)
                                        }
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Upload a faculty picture. Recommended size:
                                200x200 pixels.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Name Field */}
                <FormField
                    control={formProps.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your faculty name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display faculty name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={formProps.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    onFocus={(e) => {
                                        if (isEdit) {
                                            e.target.blur(); // prevent typing by removing focus
                                            toast.warning(
                                                "Email for faculty can't be changed."
                                            );
                                        }
                                    }}
                                    readOnly={isEdit}
                                    placeholder="Your faculty email"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display faculty email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Field */}
                <FormField
                    control={formProps.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    maxLength={12}
                                    placeholder="Your faculty phone number"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is faculty public display contact number.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Designation Field */}
                <FormField
                    control={formProps.control}
                    name="designation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your faculty designation"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is faculty designation.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Bio Field */}
                <FormField
                    control={formProps.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-y min-h-24"
                                    placeholder="Tell us a little about yourself"
                                    {...field}
                                    // Ensure that if field.value is null or undefined, we use an empty string.
                                    // value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormDescription>
                                Write a short bio about faculty. This will be
                                visible in faculty details.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
