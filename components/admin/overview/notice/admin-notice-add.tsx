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
import { AdminNoticeForm } from "@/components/admin/overview/notice/admin-notice-form";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { createNotice } from "@/lib/services/api";
import { AdminNoticeFormValues, NoticeType, zNoticeSchema } from "@/lib/types";

export function AdminNoticeAdd() {
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
    const createMutation = useGenericMutation<
        NoticeType,
        AdminNoticeFormValues
    >({
        mutationFn: createNotice,
        entityName: "Notice",
        action: "create",
        queryKeyToInvalidate: ["notices"],
        form: form,
    });

    // Form submission handler.
    const onSubmit = (data: AdminNoticeFormValues) => {
        createMutation.mutate(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} aria-label="Add Notice">
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
                                createMutation.isPending
                            }
                        >
                            {createMutation.isPending
                                ? "Creating..."
                                : "Add Notice"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
