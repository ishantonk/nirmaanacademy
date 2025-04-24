"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { createNotice } from "@/lib/services/api";

export function AdminOverviewNoticeAdd() {
    const queryClient = useQueryClient();
    const formId = "create-notice-form";

    // Initialize React Hook Form with Zod resolver and default values.
    const form = useForm<AdminNoticeFormValues>({
        resolver: zodResolver(zNoticeSchema),
        defaultValues: {
            content: "",
            visible: false,
        },
    });

    // Mutation hook for creating notice.
    const mutation = useMutation<
        NoticeType,
        Error,
        AdminNoticeFormValues,
        unknown
    >({
        mutationFn: createNotice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });

            toast.success("Notice created successfully");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating notice failed", {
                description: error.message,
            });
        },
    });

    // Form submission handler.
    const onSubmit = (data: AdminNoticeFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"lg"} aria-label="Add Notice">
                    <Plus className="h-4 w-4" />
                    Add Notice
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new notice</DialogTitle>
                    <DialogDescription>
                        Add new notice or important announcements.
                    </DialogDescription>
                </DialogHeader>

                <AdminNoticeForm
                    formId={formId}
                    formProps={form}
                    onSubmit={onSubmit}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        {/* Submit Button */}
                        <Button
                            form={formId}
                            type="submit"
                            disabled={
                                !form.formState.isDirty ||
                                mutation.isPending ||
                                form.watch("content").length === 0
                            }
                        >
                            {mutation.isPending ? "Creating..." : "Add Notice"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
