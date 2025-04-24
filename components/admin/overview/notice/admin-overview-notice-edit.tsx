"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
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
import { AdminNoticeForm } from "@/components/admin/overview/notice/admin-overview-notice-form";
import { AdminNoticeFormValues, NoticeType, zNoticeSchema } from "@/lib/types";
import { updateNotice, deleteNotice } from "@/lib/services/api";

interface AdminOverviewNoticeEditProps {
    notice: NoticeType;
}

export function AdminOverviewNoticeEdit({
    notice,
}: AdminOverviewNoticeEditProps) {
    const queryClient = useQueryClient();
    const formId = "edit-notice-form";

    // Setup form
    const form = useForm<AdminNoticeFormValues>({
        resolver: zodResolver(zNoticeSchema),
        defaultValues: {
            content: notice.content ?? "",
            visible: notice.visible ?? false,
        },
    });

    // Update mutation
    const updateMutation = useMutation<
        NoticeType,
        Error,
        { id: string } & AdminNoticeFormValues
    >({
        mutationFn: updateNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success("Notice updated successfully");
            form.reset();
        },
        onError: (error) => {
            toast.error("Updating notice failed", {
                description: error.message,
            });
        },
    });

    // Remove mutation
    const removeMutation = useMutation<NoticeType, Error, string>({
        mutationFn: deleteNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success("Notice removed successfully");
        },
        onError: (error) => {
            toast.error("Removing notice failed", {
                description: error.message,
            });
        },
    });

    // Handlers
    const onSubmit = (data: AdminNoticeFormValues) => {
        updateMutation.mutate({ ...data, id: notice.id });
    };

    const handleRemove = () => {
        removeMutation.mutate(notice.id);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Edit Notice">
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
                            onClick={handleRemove}
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
