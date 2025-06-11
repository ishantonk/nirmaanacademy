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
import { createMode } from "@/lib/services/api";
import { AdminModeFormValues, ModeType, zModeSchema } from "@/lib/types";

export function CourseModeAdd() {
    const formId = "create-mode-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminModeFormValues>({
        resolver: zodResolver(zModeSchema),
        defaultValues: {
            name: "",
        },
    });

    // Mutation hook for creating mode.
    const createMutation = useGenericMutation<ModeType, AdminModeFormValues>({
        mutationFn: createMode,
        action: "create",
        entityName: "Course Mode",
        queryKeyToInvalidate: ["modes"],
        onSuccess: () => {
            form.reset();
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminModeFormValues) => {
        createMutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset()}
                    variant="ghost"
                    aria-label="Create New Mode"
                >
                    <Plus className="w-4 h-4" />
                    Add New Mode
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new mode</DialogTitle>
                    <DialogDescription>
                        Add new mode for courses.
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
                                : "Add Mode"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
