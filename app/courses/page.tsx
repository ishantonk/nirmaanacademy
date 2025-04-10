import { CourseFilters } from "@/components/course/course-filters";
import { CoursesLive } from "@/components/course/course-live";
import { fetchCategories } from "@/lib/fetch";

export default async function CoursesPage() {
    const categories = await fetchCategories();

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Browse Courses</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar with filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="sticky top-20">
                        <CourseFilters categories={categories} />
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <CoursesLive />
                </div>
            </div>
        </>
    );
}
