"use client";

import Link from "next/link";
import { Notebook } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories } from "@/lib/services/api";
import { CategoryType } from "@/lib/types";

export function CourseCategoriesCard() {
    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery<CategoryType[]>({
        queryKey: ["course-categories"],
        queryFn: () => fetchCategories(3),
    });

    return (
        <Card className="w-full h-full py-4 bg-background/90 shadow-xl rounded-2xl border">
            <CardHeader className="px-4">
                <CardTitle className="text-lg font-bold text-primary">
                    🎓 Courses
                </CardTitle>
                <CardDescription className="text-sm">
                    Explore our diverse range of courses and boost your skills.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-4 space-y-3">
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-10 w-full rounded-full"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md">
                        <span className="font-semibold">
                            Failed to load courses
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Please try again later.
                        </span>
                    </div>
                ) : categories && categories.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">View All Courses</Link>
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                asChild
                                variant="outline"
                                className="w-full rounded-full p-6 hover:bg-primary/10"
                            >
                                <Link
                                    href={`/courses?category=${category.slug}`}
                                >
                                    {category.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="No courses available"
                        description="Please check back later."
                        icon={Notebook}
                    />
                )}
            </CardContent>
        </Card>
    );
}
