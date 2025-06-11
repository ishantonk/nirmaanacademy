import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, UseFormReturn, Path, PathValue } from "react-hook-form";
import { uploadToBlob } from "@/lib/services/api";

interface UseUploadMutationProps<TFormValues extends FieldValues> {
    entityName?: string; // e.g., "Thumbnail", "Video", etc.
    form?: UseFormReturn<TFormValues>;
    field?: Path<TFormValues>; // Specific field in the form to update
    onSuccess?: (data: { url: string; success: boolean }) => void;
}

export function useUploadMutation<TFormValues extends FieldValues>({
    onSuccess,
    form,
    field,
    entityName = "File",
}: UseUploadMutationProps<TFormValues>) {
    return useMutation<{ url: string; success: boolean }, Error, File, unknown>(
        {
            mutationFn: (file) => uploadToBlob(file),
            onSuccess: (data) => {
                toast.success(`${entityName} uploaded successfully`);

                if (form && field) {
                    form.setValue(
                        field,
                        data.url as PathValue<TFormValues, typeof field>
                    );
                }

                onSuccess?.(data);
            },
            onError: (error: Error) => {
                toast.error(`${entityName} upload failed`, {
                    description: error.message,
                });
            },
        }
    );
}
