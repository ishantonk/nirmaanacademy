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
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { deleteGallerySlide, updateGallerySlide } from "@/lib/services/api";
import {
    AdminGalleryFormValues,
    GalleryItemType,
    zGallerySchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AdminGalleryForm } from "./admin-gallery-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AdminGalleryEdit({ slide }: { slide: GalleryItemType }) {
    const formId = "edit-gallery-form";
    const formDefaultValues = {
        ...slide,
        title: slide.title ?? undefined,
        subtitle: slide.subtitle ?? undefined,
        imageUrl: slide.imageUrl ?? undefined,
        videoUrl: slide.videoUrl ?? undefined,
    };

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminGalleryFormValues>({
        resolver: zodResolver(zGallerySchema),
        defaultValues: formDefaultValues,
    });

    useEffect(() => {
        form.reset();
    }, [slide, form]);

    // Update mutation
    const updateMutation = useGenericMutation<
        GalleryItemType,
        { id: string } & AdminGalleryFormValues
    >({
        mutationFn: updateGallerySlide,
        entityName: "Gallery slide",
        action: "update",
        queryKeyToInvalidate: ["gallerySlides"],
        onSuccess: (updatedSlide) => {
            form.reset({
                ...updatedSlide,
                title: updatedSlide.title ?? "",
                subtitle: updatedSlide.subtitle ?? "",
                imageUrl: updatedSlide.imageUrl ?? "",
                videoUrl: updatedSlide.videoUrl ?? "",
            });
        },
    });

    // Remove mutation
    const removeMutation = useGenericMutation<GalleryItemType, { id: string }>({
        mutationFn: ({ id }) => deleteGallerySlide(id),
        entityName: "Slide",
        action: "delete",
        queryKeyToInvalidate: ["gallerySlides"],
    });

    // Handlers
    const onSubmit = (data: AdminGalleryFormValues) => {
        updateMutation.mutate({ ...data, id: slide.id });
    };

    const onDelete = () => {
        removeMutation.mutate({ id: slide.id });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset(formDefaultValues)}
                    size="icon"
                    variant="outline"
                    aria-label="Edit Notice"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="px-0 md:max-w-lg lg:max-w-2xl">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Slide</DialogTitle>
                    <DialogDescription>
                        Update slide image and video below.
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
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={removeMutation.isPending}
                        >
                            {removeMutation.isPending
                                ? "Removing..."
                                : "Delete Slide"}
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
                                : "Update Slide"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
