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
import { removeFaculty, updateFaculty, uploadToBlob } from "@/lib/services/api";
import {
    AdminFacultyFormValues,
    FacultyType,
    zFacultySchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";
import { useEffect } from "react";

export function AdminFacultyEdit({ faculty }: { faculty: FacultyType }) {
    const queryClient = useQueryClient();
    const formId = "edit-faculty-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminFacultyFormValues>({
        resolver: zodResolver(zFacultySchema),
        defaultValues: {
            name: faculty.name ?? "",
            email: faculty.email ?? "",
            phone: faculty.phone ?? "",
            bio: faculty.bio ?? "",
            image: faculty.image ?? "",
            designation: faculty.designation ?? "",
        },
    });

    // Reset form values when faculty prop changes (e.g., reopening dialog)
    useEffect(() => {
        form.reset({
            name: faculty.name ?? "",
            email: faculty.email ?? "",
            phone: faculty.phone ?? "",
            bio: faculty.bio ?? "",
            image: faculty.image ?? "",
            designation: faculty.designation ?? "",
        });
    }, [faculty, form]);

    // Mutation hook for editing faculty.
    const mutation = useMutation<
        FacultyType,
        Error,
        { id: string } & AdminFacultyFormValues,
        unknown
    >({
        mutationFn: updateFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculty"] });

            toast.success("Faculty updated successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Updating faculty failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            });
        },
    });

    // Mutation for uploading faculty image.
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
            form.setValue("image", uploadedUrl.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    // Mutation hook for removing faculty.
    const removeMutation = useMutation<FacultyType, Error, string, unknown>({
        mutationFn: removeFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculty"] });

            toast.success("Faculty removed successfully");
        },
        onError: (error: Error) => {
            toast.error("Removing faculty failed", {
                description: error.message,
            });
        },
    });

    // Handler for removing faculty.
    const handleRemoveFaculty = (facultyId: string) => {
        removeMutation.mutate(facultyId);
    };

    // Combined loading state: disable submit if profile update or image upload is pending.
    const submitting = mutation.isPending || uploadMutation.isPending;

    // Form submission handler.
    const onSubmit = (data: AdminFacultyFormValues) => {
        mutation.mutate({ ...data, id: faculty.id });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant={"ghost"} aria-label="Edit faculty">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            {/* Give the dialog a viewport‑relative height and hide overflow */}
            <DialogContent className="p-0 py-6 w-screen md:max-w-xl lg:max-w-4xl h-[calc(100vh-4rem)]">
                <DialogHeader className="px-6">
                    <DialogTitle>Edit Faculty</DialogTitle>
                    <DialogDescription>
                        Make changes in faculty details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="relative flex flex-col overflow-hidden">
                    <ScrollArea showShadow className="flex-1 h-full px-6 py-1">
                        <AdminFacultiesForm
                            formId={formId}
                            formProps={form}
                            uploadMutation={uploadMutation}
                            onSubmit={onSubmit}
                            isEdit
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => handleRemoveFaculty(faculty.id)}
                        >
                            Delete Faculty
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        {/* Submit Button */}
                        <Button
                            form={formId}
                            type="submit"
                            disabled={!form.formState.isDirty || submitting}
                        >
                            {submitting ? "Updating..." : "Update Faculty"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
