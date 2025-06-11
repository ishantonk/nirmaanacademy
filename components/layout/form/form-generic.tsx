"use client";

import { Form } from "@/components/ui/form";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface FormGenericProps<TFormValues extends FieldValues> {
    formId: string;
    form: UseFormReturn<TFormValues>;
    onSubmit: (data: TFormValues) => void;
    children: React.ReactNode;
    className?: string;
}

export function FormGeneric<TFormValues extends FieldValues>({
    formId,
    form,
    onSubmit,
    children,
    className = "space-y-6 mx-2 w-full",
}: FormGenericProps<TFormValues>) {
    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(onSubmit)}
                className={className}
            >
                {children}
            </form>
        </Form>
    );
}
