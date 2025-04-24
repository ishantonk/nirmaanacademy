"use client";

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
import { AlertCircle } from "lucide-react";

import { AdminOverviewNoticeAdd } from "./admin-overview-notice-add";
import { AdminOverviewNoticeCard } from "./admin-overview-notice-card";
import { fetchNotices } from "@/lib/services/api";
import { NoticeType } from "@/lib/types";

export function AdminOverviewNotice() {
    const {
        data: notices,
        isLoading,
        isError,
    } = useQuery<NoticeType[]>({
        queryKey: ["notices"],
        queryFn: () => fetchNotices(),
    });

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Notice</CardTitle>
                <CardDescription>
                    Create notices or important announcements.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                {/* Add button */}
                <div className="flex justify-end px-6">
                    <AdminOverviewNoticeAdd />
                </div>

                {/* List / Loading / Error / Empty */}
                {isLoading ? (
                    <ScrollArea className="h-[calc(80vh-14rem)]">
                        <div className="space-y-4 px-6">
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    className="h-20 w-full rounded-md"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : isError ? (
                    <div className="text-center text-red-500">
                        Failed to load notices. Please try again later.
                    </div>
                ) : notices && notices.length > 0 ? (
                    <ScrollArea className="h-[calc(80vh-14rem)]">
                        <div className="space-y-4 px-6">
                            {notices.map((notice) => (
                                <AdminOverviewNoticeCard
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
