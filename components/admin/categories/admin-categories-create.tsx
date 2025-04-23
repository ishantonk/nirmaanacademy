"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCategoriesForm } from "./admin-categories-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AdminCategoriesFormValues,
    CategoryType,
    zCategoriesSchema,
} from "@/lib/types";
import { createCategory } from "@/lib/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AdminCategoriesCreate() {
    const queryClient = useQueryClient();
    const formId = "create-category-form";

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
            queryClient.invalidateQueries({ queryKey: ["categories"] });

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
        <Card>
            <CardHeader>
                <CardTitle>Create new category</CardTitle>
                <CardDescription>
                    Add new category for courses and blogs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminCategoriesForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                />

                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button
                        form={formId}
                        type="submit"
                        disabled={!form.formState.isDirty || mutation.isPending}
                    >
                        {mutation.isPending ? "Creating..." : "Create Category"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
