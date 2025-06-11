"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createFaculty } from "@/lib/services/api";
import {
    AdminFacultyFormValues,
    FacultyType,
    zFacultySchema,
} from "@/lib/types";

export function AdminFacultiesCreate() {
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
    const createMutation = useGenericMutation<
        FacultyType,
        AdminFacultyFormValues
    >({
        mutationFn: createFaculty,
        action: "create",
        entityName: "Faculty",
        queryKeyToInvalidate: ["faculty"],
        onSuccess: () => {
            form.reset();
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminFacultyFormValues) => {
        createMutation.mutate(data);
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
                />
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-end">
                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={
                        !form.formState.isDirty || createMutation.isPending
                    }
                    form={formId}
                >
                    {createMutation.isPending
                        ? "Creating..."
                        : "Create Faculty"}
                </Button>
            </CardFooter>
        </Card>
    );
}
