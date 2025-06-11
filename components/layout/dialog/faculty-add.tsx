"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createFaculty } from "@/lib/services/api";
import {
    AdminFacultyFormValues,
    FacultyType,
    zFacultySchema,
} from "@/lib/types";

export function FacultyAdd() {
    const formId = "create-faculty-form";
    const formDefaultValues = {
        name: "",
        email: "",
        phone: "",
        bio: "",
        image: "",
        designation: "",
    };

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminFacultyFormValues>({
        resolver: zodResolver(zFacultySchema),
        defaultValues: formDefaultValues,
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
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset(formDefaultValues)}
                    variant="ghost"
                    aria-label="Create New Faculty"
                >
                    <Plus className="w-4 h-4" />
                    Add New Faculty
                </Button>
            </DialogTrigger>

            <DialogContent className="px-0 md:max-w-lg lg:max-w-2xl">
                <DialogHeader className="px-6">
                    <DialogTitle>Create new faculty</DialogTitle>
                    <DialogDescription>
                        Add new faculty or instructors for courses.
                    </DialogDescription>
                </DialogHeader>

                <div className="h-96 overflow-hidden">
                    <ScrollArea showShadow className="px-4 h-full">
                        <AdminFacultiesForm
                            formId={formId}
                            formProps={form}
                            onSubmit={onSubmit}
                        />
                    </ScrollArea>
                </div>

                <DialogFooter className="px-6">
                    <DialogClose asChild>
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
                                : "Add Faculty"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
