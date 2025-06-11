"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { AdminGalleryForm } from "@/components/admin/overview/gallery/admin-gallery-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createGallerySlide } from "@/lib/services/api";
import {
    AdminGalleryFormValues,
    GalleryItemType,
    zGallerySchema,
} from "@/lib/types";

export function AdminGalleryAdd() {
    const queryClient = useQueryClient();
    const formId = "create-gallery-slide-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminGalleryFormValues>({
        resolver: zodResolver(zGallerySchema),
        defaultValues: {
            title: "",
            subtitle: "",
            type: "IMAGE",
            imageUrl: "",
            videoUrl: "",
            sortOrder: queryClient.getQueryData.length + 1,
            visible: true,
        },
    });

    // Mutation hook for creating gallery slide.
    const createMutation = useGenericMutation<
        GalleryItemType,
        AdminGalleryFormValues
    >({
        mutationFn: createGallerySlide,
        entityName: "Gallery slide",
        action: "create",
        queryKeyToInvalidate: ["gallerySlides"],
        form: form,
    });

    // Form submission handler.
    const onSubmit = (data: AdminGalleryFormValues) => {
        createMutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} aria-label="Add Notice">
                    <Plus className="h-4 w-4" />
                    Add Slide
                </Button>
            </DialogTrigger>

            <DialogContent className="px-0 md:max-w-lg lg:max-w-2xl">
                <DialogHeader className="px-6">
                    <DialogTitle>Create new slide</DialogTitle>
                    <DialogDescription>
                        Fill in the slide details below and save to add to the
                        carousel.
                    </DialogDescription>
                </DialogHeader>

                <div className="h-96 overflow-hidden">
                    <ScrollArea showShadow className="px-4 h-full">
                        <AdminGalleryForm
                            formId={formId}
                            formProps={form}
                            onSubmit={onSubmit}
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        {/* Submit Button */}
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty ||
                                createMutation.isPending
                            }
                        >
                            {createMutation.isPending
                                ? "Creating..."
                                : "Add Slide"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
