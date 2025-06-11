import { Skeleton } from "@/components/ui/skeleton";
import { AdminCategoryEdit } from "@/components/admin/categories/admin-category-edit";
import { CategoryType } from "@/lib/types";

export function AdminCategoryCard({ category }: { category: CategoryType }) {
    return (
        <div className="flex flex-row space-x-4 bg-muted/50 border border-muted rounded-lg p-3">
            <div className="flex flex-col flex-1 space-y-2">
                <div className="flex flex-row items-center justify-start gap-x-2 whitespace-pre-wrap text-sm font-medium line-clamp-1 text-pretty">
                    <p className="text-foreground">{category.name}</p>
                    <div className="bg-muted-foreground w-1 h-1 rounded-full" />
                    <span className="text-primary">
                        Courses {category._count?.courses}
                    </span>
                </div>
                <span className="whitespace-pre-wrap text-xs font-light text-muted-foreground line-clamp-2 text-pretty">
                    {category.description}
                </span>
            </div>
            <div className="flex flex-row justify-end items-center">
                <AdminCategoryEdit category={category} />
            </div>
        </div>
    );
}

export function AdminCategoryCardSkeleton() {
    return (
        <div className="flex flex-row space-x-4 bg-muted/50 border border-muted rounded-lg p-3">
            <div className="flex flex-col flex-1 space-y-2">
                {/* Top row: name, dot, course count */}
                <div className="flex flex-row items-center gap-x-2 text-sm">
                    <Skeleton className="h-4 w-24" />
                    <div className="bg-muted-foreground w-1 h-1 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Description */}
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-5/6 rounded-md" />
            </div>

            {/* Action button (edit icon) */}
            <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
        </div>
    );
}
