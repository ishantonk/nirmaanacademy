"use client";

import { UseFormReturn } from "react-hook-form";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { SwitchField } from "@/components/layout/form/switch-field";
import { FormGeneric } from "@/components/layout/form/form-generic";
import { AdminNoticeFormValues } from "@/lib/types";

interface AdminNoticeFormProps {
    formId: string;
    formProps: UseFormReturn<AdminNoticeFormValues>;
    onSubmit: (data: AdminNoticeFormValues) => void;
}

export function AdminNoticeForm({
    formId,
    formProps,
    onSubmit,
}: AdminNoticeFormProps) {
    return (
        <FormGeneric formId={formId} form={formProps} onSubmit={onSubmit}>
            {/* Content Field */}
            <TextAreaField
                control={formProps.control}
                name="content"
                placeholder="Write your notice here..."
                description="The body of your notice (up to 300 characters)."
                className="resize-y min-h-24"
                isRequired
            />

            {/* Visible Toggle */}
            <SwitchField
                control={formProps.control}
                name="visible"
                description="Toggle whether this notice is publicly visible."
                isRequired
            />
        </FormGeneric>
    );
}
