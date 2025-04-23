"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
    AdminFacultyFormValues,
    FacultyType,
    zFacultySchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFaculty, uploadToBlob } from "@/lib/services/api";
import { toast } from "sonner";

export function AdminFacultiesCreate() {
    const queryClient = useQueryClient();
    const formId = "create-faculty-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminFacultyFormValues>({
        resolver: zodResolver(zFacultySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            bio: "",
            image: "",
            designation: "",
        },
    });

    // Mutation hook for creating faculty.
    const mutation = useMutation<
        FacultyType,
        Error,
        AdminFacultyFormValues,
        unknown
    >({
        mutationFn: createFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Faculty"] });

            toast.success("Faculty created successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating faculty failed", {
                description: error.message,
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

    // Combined loading state: disable submit if profile update or image upload is pending.
    const submitting = mutation.isPending || uploadMutation.isPending;

    // Form submission handler.
    const onSubmit = (data: AdminFacultyFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new faculty</CardTitle>
                <CardDescription>
                    Add new faculty or instructors for courses.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminFacultiesForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                    uploadMutation={uploadMutation}
                />
                <div className="flex flex-row items-center justify-end">
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={!form.formState.isDirty || submitting}
                        form={formId}
                    >
                        {submitting ? "Creating..." : "Create Faculty"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
