import { AdminCategoryEdit } from "@/components/admin/categories/admin-category-edit";
import { CategoryType } from "@/lib/types";

export function AdminCategoryCard({ category }: { category: CategoryType }) {
    return (
        <div className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3 gap-4">
            <div className="flex flex-col flex-1 items-start justify-center space-y-2">
                <div className="flex flex-row items-center justify-start w-full gap-2">
                    <h3 className="font-medium line-clamp-1">
                        {category.name}
                    </h3>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {category._count?.courses} courses
                    </span>
                </div>
                <p className="text-muted-foreground line-clamp-1">
                    {category.description}
                </p>
            </div>
            <div className="flex flex-col items-end justify-center">
                <AdminCategoryEdit category={category} />
            </div>
        </div>
    );
}
