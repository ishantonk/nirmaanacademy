"use client";

import { Tag } from "lucide-react";
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
import {
    AdminCategoryCard,
    AdminCategoryCardSkeleton,
} from "@/components/admin/categories/admin-category-card";
import { fetchCategories } from "@/lib/services/api";
import { CategoryType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function AdminCategoriesList() {
    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                        Loading categories, please wait...
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)]">
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <AdminCategoryCardSkeleton key={idx} />
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
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardDescription>
                    Loading categories, please try again later.
                </CardDescription>
                <CardContent className="h-[calc(100vh-14rem)]">
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md px-4 py-16">
                        <span className="font-semibold">
                            Failed to load categories.
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
                <CardTitle>Categories</CardTitle>
                <CardDescription>List of all categories.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-14rem)] p-0">
                {categories && categories.length ? (
                    <ScrollArea showShadow className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {categories.map((category) => (
                                <AdminCategoryCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        icon={Tag}
                        title="No Categories Found"
                        description="You haven't added any categories yet. Create a category to organize your courses."
                    />
                )}
            </CardContent>
        </Card>
    );
}
