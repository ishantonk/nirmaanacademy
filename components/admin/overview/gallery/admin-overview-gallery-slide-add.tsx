"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
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
    zGallerySchema,
    GalleryItemType,
} from "@/lib/types";
import { GallerySlideType } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createGallerySlide, uploadToBlob } from "@/lib/services/api";

export function AdminGallerySlideAdd() {
    const queryClient = useQueryClient();
    const formId = "new-gallery-slide-form";

    const form = useForm<AdminGalleryFormValues>({
        resolver: zodResolver(zGallerySchema),
        defaultValues: {
            title: "",
            subtitle: "",
            type: GallerySlideType.IMAGE,
            imageUrl: "",
            videoUrl: "",
            sortOrder: 0,
            visible: true,
        },
    });

    const mutation = useMutation<
        GalleryItemType,
        Error,
        AdminGalleryFormValues,
        unknown
    >({
        mutationFn: createGallerySlide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallerySlides"] });
            toast.success("Gallery slide added successfully");
            form.reset();
        },
        onError: (error) => {
            toast.error("Failed to add gallery slide", {
                description: error.message,
            });
        },
    });

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
    const submitting = mutation.isPending || uploadMutation.isPending;

    const onSubmit = (data: AdminGalleryFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" variant="ghost" aria-label="Add Slide">
                    <Plus className="w-4 h-4" />
                    Add Slide
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 py-6 w-screen  md:max-w-lg lg:max-w-2xl h-[calc(100vh-4rem)]">
                <DialogHeader className="px-6">
                    <DialogTitle>Add New Slide</DialogTitle>
                    <DialogDescription>
                        Fill in the slide details below and save to add to the
                        carousel.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative flex flex-col overflow-hidden">
                    <ScrollArea showShadow className="flex-1 h-full px-6 py-1">
                        <AdminGallerySlideForm
                            formId={formId}
                            formProps={form}
                            onSubmit={onSubmit}
                            uploadMutation={uploadMutation}
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty || submitting
                            }
                        >
                            {mutation.isPending ? "Adding..." : "Add Slide"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
