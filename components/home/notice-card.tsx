"use client";

import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNotices } from "@/lib/services/api";
import { NoticeType } from "@/lib/types";

export function NoticeCard() {
    const {
        data: notices,
        isLoading,
        isError,
    } = useQuery<NoticeType[]>({
        queryKey: ["notices"],
        queryFn: fetchNotices,
    });

    return (
        <Card className="w-full h-full py-4 bg-background/90 shadow-xl rounded-2xl border">
            <CardHeader className="px-4">
                <CardTitle className="text-lg font-bold text-primary">
                    📢 Important Notices
                </CardTitle>
                <CardDescription className="text-sm">
                    Stay updated with the latest announcements.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                {isLoading ? (
                    <div className="space-y-4 px-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-4 w-full rounded-full"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md px-4">
                        <span className="font-semibold">
                            Failed to load notices
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Please try again later.
                        </span>
                    </div>
                ) : notices && notices.length > 0 ? (
                    <ScrollArea className="h-60 px-4 pr-6">
                        <ol className="list-disc list-inside space-y-3">
                            {notices.map((notice) => (
                                <li
                                    key={notice.id}
                                    className="whitespace-pre-wrap text-sm font-medium text-foreground leading-relaxed hover:text-primary transition-colors cursor-pointer"
                                >
                                    {notice.content}
                                </li>
                            ))}
                        </ol>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        title="No notices available"
                        description="Stay tuned for updates."
                        icon={Megaphone}
                    />
                )}
            </CardContent>
        </Card>
    );
}
