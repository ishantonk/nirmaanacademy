"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { AdminGallerySlideForm } from "@/components/admin/overview/gallery/admin-overview-gallery-slide-form";
import {
    AdminGalleryFormValues,
    GalleryItemType,
    zGallerySchema,
} from "@/lib/types";
import { updateGallerySlide, deleteGallerySlide } from "@/lib/services/gallery";
import { uploadToBlob } from "@/lib/services/api";

export function AdminGallerySlideEdit({ slide }: { slide: GalleryItemType }) {
    const queryClient = useQueryClient();
    const formId = `edit-gallery-slide-form-${slide.id}`;

    // Initialize form with slide values
    const form = useForm<AdminGalleryFormValues>({
        resolver: zodResolver(zGallerySchema),
        defaultValues: {
            title: slide.title ?? "",
            subtitle: slide.subtitle ?? "",
            type: slide.type,
            imageUrl: slide.imageUrl ?? "",
            videoUrl: slide.videoUrl ?? "",
            sortOrder: slide.sortOrder,
            visible: slide.visible,
        },
    });

    // Update mutation
    const updateMutation = useMutation<
        GalleryItemType,
        Error,
        { id: string } & AdminGalleryFormValues,
        unknown
    >({
        mutationFn: updateGallerySlide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallerySlides"] });
            toast.success("Slide updated successfully");
            form.reset();
        },
        onError: (err) => {
            toast.error("Failed to update slide", { description: err.message });
        },
    });

    // Delete mutation
    const deleteMutation = useMutation<GalleryItemType, Error, string, unknown>(
        {
            mutationFn: (id) => deleteGallerySlide(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["gallerySlides"] });
                toast.success("Slide deleted successfully");
                form.reset();
            },
            onError: (err) => {
                toast.error("Failed to delete slide", {
                    description: err.message,
                });
            },
        }
    );

    // Mutation for uploading gallery image.
    const uploadMutation = useMutation<
        { url: string; success: boolean },
        Error,
        File,
        unknown
    >({
        mutationFn: (file) => uploadToBlob(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Faculty image successfully uploaded");
            // Optionally update the form field with the new permanent URL after upload completes.
            form.setValue("imageUrl", uploadedUrl.url.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Combined loading state: disable submit if slide creating or image upload is pending.
    const submitting = updateMutation.isPending || uploadMutation.isPending;

    const onSubmit = (data: AdminGalleryFormValues) => {
        updateMutation.mutate({ id: slide.id, ...data });
    };

    const handleDelete = () => {
        deleteMutation.mutate(slide.id);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Edit Slide">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="p-6 w-screen max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Slide</DialogTitle>
                    <DialogDescription>
                        Update the slide details below.
                    </DialogDescription>
                </DialogHeader>

                <AdminGallerySlideForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                    uploadMutation={uploadMutation}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending || submitting}
                        >
                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete Slide"}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            form={formId}
                            type="submit"
                            disabled={!form.formState.isDirty || submitting}
                        >
                            {updateMutation.isPending
                                ? "Updating..."
                                : "Update Slide"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
