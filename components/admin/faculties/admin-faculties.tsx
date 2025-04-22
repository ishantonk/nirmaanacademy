import { AdminFacultiesCreate } from "@/components/admin/faculties/admin-faculties-create";
import { AdminFacultiesList } from "@/components/admin/faculties/admin-faculties-list";

export function AdminFaculties() {
    return (
        <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <AdminFacultiesCreate />
            </div>
            <div className="lg:col-span-5 relative">
                <AdminFacultiesList />
            </div>
        </div>
    );
}
