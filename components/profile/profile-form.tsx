"use client";

import * as React from "react";
import { useEffect } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { ProfileImagePicker } from "@/components/profile/profile-image-picker";
import { ProfileFormSkeleton } from "@/components/profile/profile-form-skeleton";

/**
 * Zod schema for profile validation.
 * - name: required non-empty string.
 * - email: required valid email.
 * - bio: optional string.
 * - image: optional string.
 */
const profileSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    bio: z.string().optional(),
    image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/**
 * Fetch the user profile.
 * Uses credentials to send session cookies.
 */
async function fetchUserProfile(): Promise<ProfileFormValues> {
    const res = await fetch("/api/profile", {
        credentials: "include",
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch profile");
    }
    return res.json();
}

/**
 * Update the user profile.
 * @param data - The profile data to update.
 */
async function updateUserProfile(
    data: ProfileFormValues
): Promise<ProfileFormValues> {
    const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile");
    }
    return res.json();
}

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

    return response.json();
}

/**
 * ProfileForm Component:
 * Renders user's profile data in a form and allows editing.
 */
export function ProfileForm() {
    const queryClient = useQueryClient();

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            bio: "",
            image: "",
        },
    });

    // Fetch the current profile data using react-query.
    const {
        data: profileData,
        isLoading,
        isError,
    } = useQuery<ProfileFormValues>({
        queryKey: ["profile"],
        queryFn: fetchUserProfile,
    });

    // Once fetched, reset form values to the profile data.
    useEffect(() => {
        if (profileData) {
            if (!profileData.bio) profileData.bio = "";
            form.reset(profileData);
        }
    }, [profileData, form]);

    // Mutation hook for updating the profile.
    const mutation = useMutation<
        ProfileFormValues,
        Error,
        ProfileFormValues,
        unknown
    >({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            toast.success("Profile updated successfully");
        },
        onError: (error: Error) => {
            toast.error("Update failed", { description: error.message });
        },
    });

    // Mutation for uploading profile image.
    const uploadProfileImage = useMutation<URL, Error, File, unknown>({
        mutationFn: (file) => uploadFile(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Profile image successfully uploaded");
            // Optionally update the form field with the new permanent URL after upload completes.
            form.setValue("image", uploadedUrl.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Handler for profile image selection.
    const onProfileImageSelect = async (
        file: File,
        field: ControllerRenderProps<ProfileFormValues, "image">
    ) => {
        // Generate a temporary URL for preview.
        const imageUrl = URL.createObjectURL(file);
        // Update the form field with the temporary URL.
        field.onChange(imageUrl);
        // Trigger the image upload mutation.
        uploadProfileImage.mutate(file);
    };

    // Combined loading state: disable submit if profile update or image upload is pending.
    const isSubmitDisabled = mutation.isPending || uploadProfileImage.isPending;

    // Form submission handler.
    const onSubmit = (data: ProfileFormValues) => {
        mutation.mutate(data);
    };

    if (isLoading) return <ProfileFormSkeleton />;
    if (isError) return <p>Failed to load profile data. Please try again.</p>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                    Update your profile information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Profile Image Field */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <div className="relative max-w-fit max-h-fit">
                                            <Avatar className="h-28 w-28 border">
                                                <AvatarImage
                                                    {...field}
                                                    className="object-cover"
                                                    src={field.value}
                                                />
                                                <AvatarFallback className="text-2xl">
                                                    {form.getValues().name
                                                        ? getInitials(
                                                              form.getValues()
                                                                  .name
                                                          )
                                                        : "NA"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <ProfileImagePicker
                                                // {...field}
                                                className="absolute bottom-2 -right-2"
                                                onImageSelect={(file) =>
                                                    onProfileImageSelect(
                                                        file,
                                                        field
                                                    )
                                                }
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Upload a profile picture. Recommended
                                        size: 200x200 pixels.
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
                                            placeholder="Your name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
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
                                            placeholder="Your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display email.
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
                                        Write a short bio about yourself. This
                                        will be visible on your public profile.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" disabled={isSubmitDisabled}>
                            {isSubmitDisabled
                                ? "Updating..."
                                : "Update Profile"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
