"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { removeFaculty, updateFaculty } from "@/lib/services/api";
import {
    AdminFacultyFormValues,
    FacultyType,
    zFacultySchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";
import { useEffect } from "react";
import { useGenericMutation } from "@/hooks/use-generic-mutation";

export function AdminFacultyEdit({ faculty }: { faculty: FacultyType }) {
    const formId = "edit-faculty-form";

    const formDefaultValues = {
        ...faculty,
        phone: faculty.phone ?? undefined,
        bio: faculty.bio ?? undefined,
        image: faculty.image ?? undefined,
        designation: faculty.designation ?? undefined,
    };

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminFacultyFormValues>({
        resolver: zodResolver(zFacultySchema),
        defaultValues: formDefaultValues,
    });

    // Reset form values when faculty prop changes (e.g., reopening dialog)
    useEffect(() => {
        form.reset(formDefaultValues);
    }, [faculty, formDefaultValues, form]);

    // Mutation hook for editing faculty.
    const updateMutation = useGenericMutation<
        FacultyType,
        { id: string } & AdminFacultyFormValues
    >({
        mutationFn: updateFaculty,
        action: "update",
        entityName: "Faculty",
        queryKeyToInvalidate: ["faculty"],
        onSuccess: (data) => {
            form.reset({
                ...data,
                phone: data.phone ?? undefined,
                bio: data.bio ?? undefined,
                image: data.image ?? undefined,
                designation: data.designation ?? undefined,
            });
        },
    });

    // Mutation hook for removing faculty.
    const removeMutation = useGenericMutation<FacultyType, { id: string }>({
        mutationFn: ({ id }) => removeFaculty(id),
        action: "delete",
        entityName: "Faculty",
        queryKeyToInvalidate: ["faculty"],
    });

    // Handler for removing faculty.
    const onDelete = () => {
        removeMutation.mutate({ id: faculty.id });
    };

    // Form submission handler.
    const onSubmit = (data: AdminFacultyFormValues) => {
        updateMutation.mutate({ ...data, id: faculty.id });
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
                        <AdminFacultiesForm
                            formId={formId}
                            formProps={form}
                            onSubmit={onSubmit}
                            isEdit
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
                                : "Remove Faculty"}
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
                                : "Update Faculty"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
