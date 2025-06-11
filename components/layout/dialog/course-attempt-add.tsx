"use client";

import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormGeneric } from "@/components/layout/form/form-generic";
import { TextField } from "@/components/layout/form/text-field";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createAttempt } from "@/lib/services/api";
import {
    AdminAttemptFormValues,
    AttemptType,
    zAttemptSchema,
} from "@/lib/types";

export function CourseAttemptAdd() {
    const formId = "create-attempt-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminAttemptFormValues>({
        resolver: zodResolver(zAttemptSchema),
        defaultValues: {
            name: "",
        },
    });

    // Mutation hook for creating attempt.
    const createMutation = useGenericMutation<
        AttemptType,
        AdminAttemptFormValues
    >({
        mutationFn: createAttempt,
        action: "create",
        entityName: "Course attempt",
        queryKeyToInvalidate: ["attempts"],
        onSuccess: () => {
            form.reset();
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminAttemptFormValues) => {
        createMutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset()}
                    variant="ghost"
                    aria-label="Create New Attempt"
                >
                    <Plus className="w-4 h-4" />
                    Add New Attempt
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new attempt</DialogTitle>
                    <DialogDescription>
                        Add new attempt for courses.
                    </DialogDescription>
                </DialogHeader>

                <FormGeneric formId={formId} form={form} onSubmit={onSubmit}>
                    <TextField
                        control={form.control}
                        name="name"
                        placeholder=""
                        description=""
                        isRequired
                    />
                </FormGeneric>

                <DialogFooter>
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
                                : "Add Attempt"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
