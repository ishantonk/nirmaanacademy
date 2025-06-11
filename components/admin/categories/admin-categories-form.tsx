"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGeneric } from "@/components/layout/form/form-generic";
import { TextField } from "@/components/layout/form/text-field";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { AdminCategoriesFormValues } from "@/lib/types";

interface AdminCategoriesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminCategoriesFormValues>;
    onSubmit: (data: AdminCategoriesFormValues) => void;
}

export function AdminCategoriesForm({
    formId,
    formProps,
    onSubmit,
}: AdminCategoriesFormProps) {
    return (
        <FormGeneric formId={formId} form={formProps} onSubmit={onSubmit}>
            {/* Name Field */}
            <TextField
                control={formProps.control}
                name="name"
                placeholder="Your category name"
                description="Give your category a clear, catchy name."
                isRequired
            />

            {/* Description Field */}
            <TextAreaField
                control={formProps.control}
                name="description"
                placeholder="Tell us a little about category"
                description="Add a brief note about what this category is for."
                className="resize-y min-h-24"
            />
        </FormGeneric>
    );
}
