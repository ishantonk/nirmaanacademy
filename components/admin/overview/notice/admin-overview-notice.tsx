"use client";

import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
    AdminNoticeCard,
    AdminNoticeCardSkeleton,
} from "@/components/admin/overview/notice/admin-notice-card";
import { AdminNoticeAdd } from "@/components/admin/overview/notice/admin-notice-add";
import { fetchNotices } from "@/lib/services/api";
import { NoticeType } from "@/lib/types";

export function AdminOverviewNotice() {
    const {
        data: notices,
        isLoading,
        isError,
    } = useQuery<NoticeType[]>({
        queryKey: ["notices"],
        queryFn: fetchNotices,
    });

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Notice</CardTitle>
                    <CardDescription>
                        Loading your notices or important announcements.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Add button */}
                    <div className="flex justify-end px-6 mb-4">
                        <Skeleton className="w-32 h-9 rounded-md" />
                    </div>

                    {/* Notices */}
                    <div className="space-y-4 px-6">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <AdminNoticeCardSkeleton key={idx} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Notice</CardTitle>
                    <CardDescription>
                        Error on fetching notices or important announcements.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md px-4 py-16">
                        <span className="font-semibold">
                            Failed to load notices.
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Please try again later.
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notice</CardTitle>
                <CardDescription>
                    Create notices or important announcements.
                </CardDescription>
            </CardHeader>
            <CardContent className="relative p-0 space-y-4">
                {/* Add button */}
                <div className="flex justify-end px-6">
                    <AdminNoticeAdd />
                </div>

                {notices && notices.length > 0 ? (
                    <ScrollArea showShadow className="h-[calc(80vh-14rem)]">
                        <div className="space-y-4 px-6">
                            {notices.map((notice) => (
                                <AdminNoticeCard
                                    key={notice.id}
                                    notice={notice}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        icon={AlertCircle}
                        title="No Notices Found"
                        description="You haven't added any notices yet. Click “Add” to create one."
                    />
                )}
            </CardContent>
        </Card>
    );
}
