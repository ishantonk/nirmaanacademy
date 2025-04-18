"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IconImagePicker } from "@/components/ui/icon-image-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getInitials } from "@/lib/utils";

/**
 * Zod schema for faculty validation.
 * - name: required non-empty string.
 * - email: required valid email.
 * - phone: optional string.
 * - bio: optional string.
 * - image: optional string.
 * - designation: optional string.
 */
const facultySchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    designation: z.string().optional(),
});

type AdminFacultyFormValues = z.infer<typeof facultySchema>;

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
 * Create new faculty.
 * @param data - Data for creating new faculty.
 */
async function createNewFaculty(
    data: AdminFacultyFormValues
): Promise<AdminFacultyFormValues> {
    const response = await fetch("/api/faculty", {
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
        throw new Error(errorData.error || "Failed to create faculty");
    }
    return response.json();
}

export function AdminFacultiesForm() {
    const queryClient = useQueryClient();

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminFacultyFormValues>({
        resolver: zodResolver(facultySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            bio: "",
            image: "",
            designation: "",
        },
    });

    // Mutation hook for creating faculty.
    const mutation = useMutation<
        AdminFacultyFormValues,
        Error,
        AdminFacultyFormValues,
        unknown
    >({
        mutationFn: createNewFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Faculty"] });

            toast.success("Faculty created successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating faculty failed", {
                description: error.message,
            });
        },
    });

    // Mutation for uploading faculty image.
    const uploadFacultyImage = useMutation<URL, Error, File, unknown>({
        mutationFn: (file) => uploadFile(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Faculty image successfully uploaded");
            // Optionally update the form field with the new permanent URL after upload completes.
            form.setValue("image", uploadedUrl.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Handler for faculty image selection.
    const onFacultyImageSelect = async (
        file: File,
        field: ControllerRenderProps<AdminFacultyFormValues, "image">
    ) => {
        // Generate a temporary URL for preview.
        const imageUrl = URL.createObjectURL(file);
        // Update the form field with the temporary URL.
        field.onChange(imageUrl);
        // Trigger the image upload mutation.
        uploadFacultyImage.mutate(file);
    };

    // Combined loading state: disable submit if profile update or image upload is pending.
    const isSubmitDisabled = mutation.isPending || uploadFacultyImage.isPending;

    // Form submission handler.
    const onSubmit = (data: AdminFacultyFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Faculty Image Field */}
                <FormField
                    control={form.control}
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
                                            {form.getValues().name
                                                ? getInitials(
                                                      form.getValues().name
                                                  )
                                                : "NA"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <IconImagePicker
                                        // {...field}
                                        className="absolute bottom-2 -right-2"
                                        onImageSelect={(file) =>
                                            onFacultyImageSelect(file, field)
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
                    control={form.control}
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
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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

                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitDisabled}>
                        {isSubmitDisabled ? "Creating..." : "Create Faculty"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
