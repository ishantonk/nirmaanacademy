"use client";

import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { AdminNoticeEdit } from "@/components/admin/overview/notice/admin-notice-edit";
import { useGenericMutation } from "@/hooks/use-generic-mutation";
import { updateNoticeVisibility } from "@/lib/services/api";
import { NoticeType } from "@/lib/types";

export function AdminNoticeCard({ notice }: { notice: NoticeType }) {
    // Update status mutation
    const updateStatusMutation = useGenericMutation<
        NoticeType,
        { id: string; visible: boolean }
    >({
        mutationFn: ({ id, visible }) => updateNoticeVisibility(id, visible),
        entityName: "Notice status",
        action: "update",
        queryKeyToInvalidate: ["notices"],
    });

    const handleToggle = (checked: boolean) => {
        updateStatusMutation.mutate({ id: notice.id, visible: checked });
    };

    return (
        <div className="flex flex-row space-x-4 bg-muted/50 border border-muted rounded-lg p-3">
            <div className="flex flex-col flex-1 space-y-2">
                <p className="whitespace-pre-wrap text-sm font-medium text-muted-foreground line-clamp-2">
                    {notice.content}
                </p>
            </div>
            <div className="flex flex-row justify-end items-center space-x-2">
                <div className="flex flex-row justify-center items-center gap-x-2 scale-90">
                    <Label
                        htmlFor={`notice-visibility-${notice.id}`}
                        className="text-xs text-muted-foreground"
                    >
                        Visible
                    </Label>
                    <Switch
                        id={`notice-visibility-${notice.id}`}
                        aria-label="Toggle notice visibility"
                        checked={notice.visible}
                        onCheckedChange={handleToggle}
                        isLoading={updateStatusMutation.isPending}
                    />
                </div>
                <AdminNoticeEdit notice={notice} />
            </div>
        </div>
    );
}

export function AdminNoticeCardSkeleton() {
    return (
        <div className="flex flex-row space-x-4 bg-muted/50 border border-muted rounded-lg p-3">
            <div className="flex flex-col flex-1 space-y-2">
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-1/3 h-4 rounded-full" />
            </div>
            <div className="flex flex-row justify-end items-center space-x-2">
                <Skeleton className="h-4 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
        </div>
    );
}
