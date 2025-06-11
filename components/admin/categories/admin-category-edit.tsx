"use client";

import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AdminCategoriesForm } from "@/components/admin/categories/admin-categories-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { removeCategory, updateCategory } from "@/lib/services/api";
import {
    AdminCategoriesFormValues,
    CategoryType,
    zCategoriesSchema,
} from "@/lib/types";

export function AdminCategoryEdit({ category }: { category: CategoryType }) {
    const formId = "edit-category-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminCategoriesFormValues>({
        resolver: zodResolver(zCategoriesSchema),
        defaultValues: { ...category, description: category.description ?? "" },
    });

    // Mutation hook for updating category.
    const updateMutation = useGenericMutation<
        CategoryType,
        { id: string } & AdminCategoriesFormValues
    >({
        mutationFn: updateCategory,
        action: "update",
        entityName: "Category",
        queryKeyToInvalidate: ["categories"],
        onSuccess: (data) => {
            form.reset({ ...data, description: data.description ?? "" });
        },
    });

    // Mutation hook for removing category.
    const removeMutation = useGenericMutation<CategoryType, { id: string }>({
        mutationFn: ({ id }) => removeCategory(id),
        action: "delete",
        entityName: "Category",
        queryKeyToInvalidate: ["categories"],
    });

    const onDelete = () => {
        removeMutation.mutate({ id: category.id });
    };

    // Form submission handler.
    const onSubmit = (data: AdminCategoriesFormValues) => {
        updateMutation.mutate({ ...data, id: category.id });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() =>
                        form.reset({
                            ...category,
                            description: category.description ?? "",
                        })
                    }
                    size="icon"
                    variant="outline"
                    aria-label="Edit Category"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="px-0 md:max-w-lg lg:max-w-2xl">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Make changes in category details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-4">
                    <AdminCategoriesForm
                        formId={formId}
                        formProps={form}
                        onSubmit={onSubmit}
                    />
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={removeMutation.isPending}
                        >
                            {removeMutation.isPending
                                ? "Removing..."
                                : "Delete Category"}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty ||
                                updateMutation.isPending
                            }
                        >
                            {updateMutation.isPending
                                ? "Updating..."
                                : "Update Category"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
