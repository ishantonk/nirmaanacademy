import type { Metadata } from "next";
import { Search } from "lucide-react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseGrid } from "@/components/course/course-grid";
import { Input } from "@/components/ui/input";
import { CategoryType, CourseType } from "@/lib/types";
import { CourseCard } from "@/components/course/course-card";
import { brandName } from "@/data/contact-info";
import { CourseAddCartButton } from "@/components/course/course-add-cart";

export const metadata: Metadata = {
    title: "Courses | " + brandName,
    description: "Browse all courses",
};

interface CoursesPageProps {
    searchParams: {
        category?: string;
        search?: string;
        price?: string;
        sort?: string;
    };
}

async function getCourses(searchParams: CoursesPageProps["searchParams"]) {
    const filteredParams = Object.entries(searchParams)
        .filter(([, value]) => typeof value === "string")
        .reduce((acc, [key, value]) => {
            acc[key] = value as string;
            return acc;
        }, {} as Record<string, string>);

    const params = new URLSearchParams(filteredParams);
    const response = await fetch(
        `${process.env.DOMAIN}/api/courses?${params.toString()}`
    );

    if (response.ok) {
        const courses: CourseType[] = await response.json();
        return courses;
    }
    return [];
}

async function getCategories() {
    const response = await fetch(`${process.env.DOMAIN}/api/categories`);
    if (response.ok) {
        const categories: CategoryType[] = await response.json();
        return categories;
    }
    return [];
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
    const params = await Promise.resolve(searchParams);
    const courses = await getCourses(params);
    const categories = await getCategories();

    return (
        <div className="container py-8 mx-auto px-4">
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
                    <div className="mb-6">
                        <form action="/courses" method="GET">
                            {/* Preserve other query params */}
                            {params.category && (
                                <input
                                    type="hidden"
                                    name="category"
                                    value={params.category}
                                />
                            )}
                            {params.price && (
                                <input
                                    type="hidden"
                                    name="price"
                                    value={params.price}
                                />
                            )}
                            {params.sort && (
                                <input
                                    type="hidden"
                                    name="sort"
                                    value={params.sort}
                                />
                            )}

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    name="search"
                                    placeholder="Search courses..."
                                    className="pl-10"
                                    defaultValue={params.search}
                                />
                            </div>
                        </form>
                    </div>

                    <CourseGrid
                        courses={courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                course={course}
                                actions={
                                    <CourseAddCartButton
                                        courseId={course.id}
                                        isInCart={false}
                                    />
                                }
                            />
                        ))}
                    />
                </div>
            </div>
        </div>
    );
}
