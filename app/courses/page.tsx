import { CourseFilters } from "@/components/course/course-filters";
import { CoursesLive } from "@/components/course/course-live";
import { fetchCategories } from "@/lib/services/api";

export default async function CoursesPage() {
    const categories = await fetchCategories();

    return (
        <>
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Browse Courses
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    View all courses we provide.
                </p>
            </div>
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
