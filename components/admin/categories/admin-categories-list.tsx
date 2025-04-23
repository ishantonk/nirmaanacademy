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
import { AdminCategoryCard } from "@/components/admin/categories/admin-category-card";
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
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                        Loading categories, please wait...
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    className="h-8 w-full rounded-md"
                                />
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
                    <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <div className="text-center text-red-500">
                        Failed to load categories. Please try again later.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>List of all categories.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-14rem)] p-0">
                {categories && categories.length ? (
                    <ScrollArea className="h-full px-6 py-4">
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
