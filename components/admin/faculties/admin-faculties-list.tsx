"use client";

import { GraduationCap } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AdminFacultyCard,
    AdminFacultyCardSkeleton,
} from "@/components/admin/faculties/admin-faculty-card";
import { fetchFaculties } from "@/lib/services/api";
import { FacultyType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function AdminFacultiesList() {
    const { data, isLoading, isError } = useQuery<FacultyType[]>({
        queryKey: ["faculty"],
        queryFn: fetchFaculties,
    });

    if (isLoading) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Faculties</CardTitle>
                    <CardDescription>
                        Loading Faculties, please wait...
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)]">
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <AdminFacultyCardSkeleton key={idx} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Faculties</CardTitle>
                    <CardDescription>
                        Loading Faculties failed, please try again later.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)]">
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md px-4 py-16">
                        <span className="font-semibold">
                            Failed to load faculties.
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
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Faculties</CardTitle>
                <CardDescription>List of all faculties.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-14rem)] p-0">
                {data?.length ? (
                    <ScrollArea showShadow className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {data.map((faculty) => (
                                <AdminFacultyCard
                                    key={faculty.id}
                                    faculty={faculty}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        icon={GraduationCap}
                        title="No Faculty Members Found"
                        description="It looks like there are no faculty profiles added yet. Start by creating a new faculty to build your academic team."
                    />
                )}
            </CardContent>
        </Card>
    );
}
