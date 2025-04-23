import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { AdminFacultyEdit } from "@/components/admin/faculties/admin-faculty-edit";
import { FacultyType } from "@/lib/types";

export function AdminFacultyCard({ faculty }: { faculty: FacultyType }) {
    return (
        <div className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3">
            <CourseFacultyInfoCard size="lg" faculty={faculty} />
            <div className="flex flex-1 items-center justify-end">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <AdminFacultyEdit faculty={faculty} />
                </div>
            </div>
        </div>
    );
}
