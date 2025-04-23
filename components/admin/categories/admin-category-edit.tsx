"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
    AdminCategoriesFormValues,
    CategoryType,
    zCategoriesSchema,
} from "@/lib/types";
import { removeCategory, updateCategory } from "@/lib/services/api";

export function AdminCategoryEdit({ category }: { category: CategoryType }) {
    const queryClient = useQueryClient();
    const formId = "edit-category-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminCategoriesFormValues>({
        resolver: zodResolver(zCategoriesSchema),
        defaultValues: {
            name: category.name ?? "",
            description: category.description ?? "",
        },
    });

    // Mutation hook for updating category.
    const mutation = useMutation<
        CategoryType,
        Error,
        { id: string } & AdminCategoriesFormValues,
        unknown
    >({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });

            toast.success("Category updated successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Updating category failed", {
                description: error.message,
            });
        },
    });

    // Mutation hook for removing category.
    const removeMutation = useMutation({
        mutationFn: removeCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });

            toast.success("Category removed successfully");
        },
        onError: (error: Error) => {
            toast.error("Removing category failed", {
                description: error.message,
            });
        },
    });

    const handleRemoveCategory = (categoryId: string) => {
        removeMutation.mutate(categoryId);
    };

    // Form submission handler.
    const onSubmit = (data: AdminCategoriesFormValues) => {
        mutation.mutate({ ...data, id: category.id });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant={"ghost"}
                    aria-label="Edit Category"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            {/* Give the dialog a viewport‑relative height and hide overflow */}
            <DialogContent className="p-0 py-6 w-screen md:max-w-xl lg:max-w-4xl h-[calc(100vh-4rem)]">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Make changes in category details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 h-full px-6 py-1">
                        <AdminCategoriesForm
                            formId={formId}
                            formProps={form}
                            onSubmit={onSubmit}
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => handleRemoveCategory(category.id)}
                        >
                            Delete Faculty
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        {/* Submit Button */}
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty || mutation.isPending
                            }
                        >
                            {mutation.isPending
                                ? "Updating..."
                                : "Update Category"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
