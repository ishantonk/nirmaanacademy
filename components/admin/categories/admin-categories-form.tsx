"use client";

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
import { createCategory } from "@/lib/services/api";
import {
    AdminCategoriesFormValues,
    CategoryType,
    zCategoriesSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AdminCategoriesForm() {
    const queryClient = useQueryClient();

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminCategoriesFormValues>({
        resolver: zodResolver(zCategoriesSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    // Mutation hook for creating category.
    const mutation = useMutation<
        CategoryType,
        Error,
        AdminCategoriesFormValues,
        unknown
    >({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });

            toast.success("Category created successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating category failed", {
                description: error.message,
            });
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminCategoriesFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your category name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display category name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                                    placeholder="Tell us a little about category"
                                    {...field}
                                    // Ensure that if field.value is null or undefined, we use an empty string.
                                    // value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormDescription>
                                Write a short description about category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Creating..." : "Create Category"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
