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
import { Skeleton } from "@/components/ui/skeleton";
import { AdminFacultyCard } from "@/components/admin/faculties/admin-faculty-card";
import { fetchFaculties } from "@/lib/services/api";
import { FacultyType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function AdminFacultiesList() {
    const { data, isLoading, isError } = useQuery<FacultyType[]>({
        queryKey: ["Faculty"],
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
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3"
                                >
                                    {/* Simulated CourseFacultyInfoCard */}
                                    <div className="flex flex-col gap-2 w-40">
                                        <Skeleton className="h-6 w-32 rounded-md" />{" "}
                                        {/* Name */}
                                        <Skeleton className="h-4 w-24 rounded-md" />{" "}
                                        {/* Title */}
                                        <Skeleton className="h-4 w-20 rounded-md" />{" "}
                                        {/* Department */}
                                    </div>

                                    {/* Simulated AdminFacultyEdit */}
                                    <div className="flex flex-1 items-center justify-end">
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            <Skeleton className="h-10 w-24 rounded-md" />{" "}
                                            {/* Edit button */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Faculties</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <div className="text-center text-red-500">
                        Failed to load courses. Please try again later.
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
                    <ScrollArea className="h-full px-6 py-4">
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
