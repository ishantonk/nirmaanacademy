"use client";

import { useEffect } from "react";
import { Pencil } from "lucide-react";
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
import { AdminNoticeForm } from "@/components/admin/overview/notice/admin-notice-form";
import { deleteNotice, updateNotice } from "@/lib/services/api";
import { AdminNoticeFormValues, NoticeType, zNoticeSchema } from "@/lib/types";
import { useGenericMutation } from "@/hooks/use-generic-mutation";

export function AdminNoticeEdit({ notice }: { notice: NoticeType }) {
    const formId = "edit-notice-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminNoticeFormValues>({
        resolver: zodResolver(zNoticeSchema),
        defaultValues: { ...notice },
    });

    useEffect(() => {
        form.reset({ ...notice });
    }, [notice, form]);

    // Update mutation
    const updateMutation = useGenericMutation<
        NoticeType,
        { id: string } & AdminNoticeFormValues
    >({
        mutationFn: updateNotice,
        entityName: "Notice",
        action: "update",
        queryKeyToInvalidate: ["notices"],
        onSuccess: (updatedNotice) => {
            form.reset({ ...updatedNotice });
        },
    });

    // Remove mutation
    const removeMutation = useGenericMutation<NoticeType, { id: string }>({
        mutationFn: ({ id }) => deleteNotice(id),
        entityName: "Notice",
        action: "delete",
        queryKeyToInvalidate: ["notices"],
    });

    // Handlers
    const onSubmit = (data: AdminNoticeFormValues) => {
        updateMutation.mutate({ ...data, id: notice.id });
    };

    const onDelete = () => {
        removeMutation.mutate({ id: notice.id });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={() => form.reset({ ...notice })}
                    size="icon"
                    variant="ghost"
                    aria-label="Edit Notice"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="p-6 w-screen max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Notice</DialogTitle>
                    <DialogDescription>
                        Update notice content and visibility below.
                    </DialogDescription>
                </DialogHeader>

                <AdminNoticeForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={removeMutation.isPending}
                        >
                            {removeMutation.isPending
                                ? "Removing..."
                                : "Delete Notice"}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty ||
                                updateMutation.isPending
                            }
                        >
                            {updateMutation.isPending
                                ? "Updating..."
                                : "Update Notice"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
