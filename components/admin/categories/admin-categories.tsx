import { AdminCategoriesCreate } from "@/components/admin/categories/admin-categories-create";
import { AdminCategoriesList } from "@/components/admin/categories/admin-categories-list";

export function AdminCategories() {
    return (
        <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <AdminCategoriesCreate />
            </div>
            <div className="lg:col-span-5">
                <AdminCategoriesList />
            </div>
        </div>
    );
}
