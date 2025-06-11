import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues, UseFormReturn } from "react-hook-form";

type UseGenericMutationProps<TData, TVariables extends FieldValues> = {
    mutationFn: (data: TVariables) => Promise<TData>;
    entityName: string;
    action: "create" | "update" | "delete";
    queryKeyToInvalidate?: string[];
    form?: UseFormReturn<TVariables>;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
};

export function useGenericMutation<TData, TVariables extends FieldValues>({
    mutationFn,
    entityName,
    action,
    queryKeyToInvalidate = [],
    form,
    onSuccess,
    onError,
}: UseGenericMutationProps<TData, TVariables>) {
    const queryClient = useQueryClient();

    const actionPastTense = {
        create: "created",
        update: "updated",
        delete: "deleted",
    }[action];

    return useMutation<TData, Error, TVariables>({
        mutationFn,
        onSuccess: (data) => {
            if (queryKeyToInvalidate.length > 0) {
                queryClient.invalidateQueries({
                    queryKey: queryKeyToInvalidate,
                });
            }

            toast.success(`${entityName} ${actionPastTense} successfully!`);

            form?.reset();

            onSuccess?.(data);
        },
        onError: (error) => {
            toast.error(
                `${
                    action.charAt(0).toUpperCase() + action.slice(1)
                }ing ${entityName} failed`,
                {
                    description: error.message,
                }
            );
            onError?.(error);
        },
    });
}
