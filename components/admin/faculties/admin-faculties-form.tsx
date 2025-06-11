"use client";

import { UseFormReturn } from "react-hook-form";
import { FormGeneric } from "@/components/layout/form/form-generic";
import { TextField } from "@/components/layout/form/text-field";
import { AvatarField } from "@/components/layout/form/avatar-field";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { useUploadMutation } from "@/hooks/use-upload-mutation";
import { AdminFacultyFormValues } from "@/lib/types";

interface AdminFacultiesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminFacultyFormValues>;
    onSubmit: (data: AdminFacultyFormValues) => void;
    isEdit?: boolean;
}

export function AdminFacultiesForm({
    formId,
    formProps,
    onSubmit,
    isEdit = false,
}: AdminFacultiesFormProps) {
    // Mutation for uploading faculty image.
    const uploadMutation = useUploadMutation({
        entityName: "Faculty image",
        field: "image",
        form: formProps,
    });

    return (
        <FormGeneric formId={formId} form={formProps} onSubmit={onSubmit}>
            {/* Faculty Avatar Field */}
            <AvatarField
                control={formProps.control}
                name="image"
                avatarName={formProps.getValues("name")}
                description="Upload a clear photo of the faculty member."
                uploadMutation={uploadMutation}
            />

            {/* Name Field */}
            <TextField
                control={formProps.control}
                name="name"
                placeholder="Dr. Jane Doe"
                description="Full name of the faculty member."
                isRequired
            />

            {/* Email Field */}
            <TextField
                control={formProps.control}
                name="email"
                readOnly={isEdit}
                disabled={isEdit}
                aria-disabled={isEdit}
                placeholder="jane.doe@example.com"
                description="Official email address for contact."
                isRequired
            />

            {/* Phone Field */}
            <TextField
                control={formProps.control}
                name="phone"
                placeholder="+91 234 567 8900"
                description="Optional phone number for direct communication."
            />

            {/* Designation Field */}
            <TextField
                control={formProps.control}
                name="designation"
                placeholder="Professor of AI"
                description="Their academic or administrative title."
            />

            {/* Bio Field */}
            <TextAreaField
                control={formProps.control}
                name="bio"
                placeholder="Brief professional bio or area of expertise."
                description="Summarize their background, research interests, or contributions."
                className="resize-y min-h-24"
            />
        </FormGeneric>
    );
}
