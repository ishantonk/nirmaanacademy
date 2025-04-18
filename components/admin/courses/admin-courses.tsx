import { AdminCoursesCreate } from "@/components/admin/courses/admin-courses-create";
import { AdminCoursesList } from "@/components/admin/courses/admin-courses-list";

export function AdminCourses() {
    return (
        <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <AdminCoursesCreate />
            </div>
            <div className="lg:col-span-5">
                <AdminCoursesList />
            </div>
        </div>
    );
}
