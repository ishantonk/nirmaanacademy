"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateCourseStatus } from "@/lib/services/api";

export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface CourseStatusSelectProps {
    courseSlug: string;
    currentStatus: CourseStatus;
    className?: string;
}

export function AdminCourseStatusSelect({
    courseSlug,
    currentStatus,
    className,
}: CourseStatusSelectProps) {
    const [status, setStatus] = useState<CourseStatus>(currentStatus);
    const queryClient = useQueryClient();

    const mutation = useMutation<{ status: CourseStatus }, Error, CourseStatus>(
        {
            mutationFn: (newStatus) =>
                updateCourseStatus(courseSlug, { status: newStatus }),
            onSuccess: (data) => {
                toast.success("Status updated!");
                setStatus(data.status);
                queryClient.invalidateQueries({
                    queryKey: ["courses", courseSlug],
                });
            },
            onError: (err) => {
                toast.error("Update status failed", {
                    description: err.message,
                });
                // revert
                setStatus(currentStatus);
            },
        }
    );

    return (
        <Select
            value={status}
            onValueChange={(v) => {
                setStatus(v as CourseStatus);
                mutation.mutate(v as CourseStatus);
            }}
            disabled={mutation.isPending}
        >
            <SelectTrigger size="sm" className={cn(className, "text-xs")}>
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
        </Select>
    );
}
