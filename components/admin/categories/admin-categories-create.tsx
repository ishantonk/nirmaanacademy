"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCategoriesForm } from "@/components/admin/categories/admin-categories-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createCategory } from "@/lib/services/api";
import {
    AdminCategoriesFormValues,
    CategoryType,
    zCategoriesSchema,
} from "@/lib/types";

export function AdminCategoriesCreate() {
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
    const createMutation = useGenericMutation<
        CategoryType,
        AdminCategoriesFormValues
    >({
        mutationFn: createCategory,
        action: "create",
        entityName: "Category",
        queryKeyToInvalidate: ["categories"],
        onSuccess: () => {
            form.reset();
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminCategoriesFormValues) => {
        createMutation.mutate(data);
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
                {/* Category Form */}
                <AdminCategoriesForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                />
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-end">
                {/* Submit Button */}
                <Button
                    form={formId}
                    type="submit"
                    disabled={
                        !form.formState.isDirty || createMutation.isPending
                    }
                >
                    {createMutation.isPending
                        ? "Creating..."
                        : "Create Category"}
                </Button>
            </CardFooter>
        </Card>
    );
}
