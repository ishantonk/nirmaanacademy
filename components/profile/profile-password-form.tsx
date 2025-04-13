"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

/**
 * Zod schema for password validation.
 * - currentPassword: required at least 8 characters.
 * - newPassword: required at least 8 characters.
 * - confirmPassword: required at least 8 characters.
 */
const passwordSchema = z
    .object({
        currentPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

async function updateUserPassword(
    data: PasswordFormValues
): Promise<PasswordFormValues> {
    const response = await fetch("/api/profile/password", {
        method: "PATCH",
        credentials: "include",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update password");
    }

    return response.json();
}

/**
 * ProfilePasswordForm Component:
 * Renders user's profile data in a form and allows editing.
 */
export function ProfilePasswordForm() {
    const queryClient = useQueryClient();

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    // Mutation hook for updating the profile password.
    const mutation = useMutation<
        PasswordFormValues,
        Error,
        PasswordFormValues,
        unknown
    >({
        mutationFn: updateUserPassword,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["password"] });

            toast.success("Password updated successfully");
        },
        onError: (error: Error) => {
            toast.error("Update failed", { description: error.message });
        },
    });

    // Form submission handler.
    const onSubmit = (data: PasswordFormValues) => {
        mutation.mutate(data);
    };

    // if (isLoading) return <p>Loading password...</p>;
    // if (isError) return <p>Failed to load password. Please try again.</p>;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Current Password Field */}
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Your current password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your current password to verify
                                        your identity.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* New Password Field */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Your New password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your new password must be at least 8
                                        characters.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password Field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Confirm your new password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending
                                ? "Updating..."
                                : "Update Password"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
