"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { NoticeType } from "@/lib/types";
import { updateNoticeVisibility } from "@/lib/services/api";
import { toast } from "sonner";
import { AdminOverviewNoticeEdit } from "./admin-overview-notice-edit";

interface AdminOverviewNoticeCardProps {
    notice: NoticeType;
}

export function AdminOverviewNoticeCard({
    notice,
}: AdminOverviewNoticeCardProps) {
    const queryClient = useQueryClient();
    const [isVisible, setIsVisible] = useState(notice.visible ?? false);

    const mutation = useMutation<
        NoticeType,
        Error,
        { id: string; visible: boolean }
    >({
        mutationFn: ({ id, visible }) => updateNoticeVisibility(id, visible),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notices"] });
            toast.success("Visibility updated", {
                description: isVisible
                    ? "Notice is now visible"
                    : "Notice is now hidden",
            });
        },
        onError: (error: unknown) => {
            const err = error as Error;
            toast.error("Failed to update visibility", {
                description: err.message,
            });
            setIsVisible((prev) => !prev);
        },
    });

    const handleToggle = (checked: boolean) => {
        setIsVisible(checked);
        mutation.mutate({ id: notice.id, visible: checked });
    };

    return (
        <div className="flex flex-col bg-muted/50 border border-muted rounded-lg p-3">
            <div className="flex items-center justify-center">
                <p className="whitespace-pre-wrap text-sm font-medium text-foreground line-clamp-2">
                    {notice.content}
                </p>
            </div>

            <div className="flex flex-row justify-end items-center mt-2 gap-4">
                <div className="flex items-center space-x-2">
                    <label
                        htmlFor={`notice-visibility-${notice.id}`}
                        className="text-xs text-muted-foreground"
                    >
                        Visible
                    </label>
                    <Switch
                        id={`notice-visibility-${notice.id}`}
                        aria-label="Toggle notice visibility"
                        checked={isVisible}
                        onCheckedChange={handleToggle}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <AdminOverviewNoticeEdit notice={notice} />
                </div>
            </div>
        </div>
    );
}
