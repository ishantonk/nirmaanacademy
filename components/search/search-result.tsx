"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { CourseCard } from "@/components/course/course-card";
import { CourseCardSkeleton } from "@/components/course/course-card-skeleton";
import { CategoryType, CourseType } from "@/lib/types";

// -----------------------------------------------------------------------------
// FETCH FUNCTIONS
// -----------------------------------------------------------------------------
const fetchCategories = async (): Promise<CategoryType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/categories`);
    if (!res.ok) {
        throw new Error("Error fetching categories");
    }
    return res.json();
};

const fetchCourses = async (query: string): Promise<CourseType[]> => {
    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_DOMAIN
        }/api/courses?search=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
        throw new Error("Error fetching courses");
    }
    return res.json();
};

const fetchCoursesByCategory = async (
    category: string
): Promise<CourseType[]> => {
    const res = await fetch(
        `${
            process.env.NEXT_PUBLIC_DOMAIN
        }/api/courses?category=${encodeURIComponent(category)}`
    );
    if (!res.ok) {
        throw new Error("Error fetching courses by category");
    }
    return res.json();
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export function SearchResult({ query }: { query: string }) {
    const searchParams = useSearchParams();
    // Read the "category" query parameter from the URL.
    const category = searchParams.get("category");

    // When a category exists, we ignore the text query and show courses from that category.
    if (category) return <ShowCourses category={category} />;
    if (query) return <ShowCourses query={query} />;
    // If no search term or category, show all categories.
    return <ShowCategories />;
}

// -----------------------------------------------------------------------------
// COMPONENT: SHOW CATEGORIES
// -----------------------------------------------------------------------------
function ShowCategories() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    if (isLoading) return <CategoryLoadingSkeleton />;
    if (error || !data)
        return (
            <div className="p-4 text-center">
                <p>Error loading categories.</p>
            </div>
        );

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((category) => (
                    <Button
                        key={category.id}
                        variant="outline"
                        className="h-auto py-4 justify-start"
                        asChild
                    >
                        <Link href={`/search?category=${category.slug}`}>
                            {category.name}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    );
}

// Skeleton for loading categories
function CategoryLoadingSkeleton() {
    const skeletonItems = Array.from({ length: 8 });
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                <Skeleton className="w-40 h-6" />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skeletonItems.map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-auto py-4 rounded border"
                    />
                ))}
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// COMPONENT: SHOW COURSES
// -----------------------------------------------------------------------------
function ShowCourses({
    query,
    category,
}: {
    query?: string;
    category?: string;
}) {
    // Decide which fetch function and query key to use.
    const queryKey = category
        ? ["courses", "category", category]
        : ["courses", query];
    const queryFn = category
        ? () => fetchCoursesByCategory(category)
        : () => fetchCourses(query!);

    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn,
        enabled: !!(query || category),
    });

    if (isLoading) return <CoursesLoadingSkeleton />;
    if (error)
        return (
            <div className="p-4 text-center">
                <p>Error loading courses.</p>
            </div>
        );

    if (!data || data.length === 0) {
        const message = category
            ? "We couldn't find any courses in this category."
            : `We couldn't find any courses matching "${query}".`;
        return (
            <EmptyState
                title="No courses found"
                description={message}
                action={
                    <Button asChild variant="outline">
                        <a href="/search">Clear Search</a>
                    </Button>
                }
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-xl font-semibold mb-4">
                {data.length} {data.length === 1 ? "course" : "courses"} found
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        href={`/courses/${course.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Skeleton for loading courses
function CoursesLoadingSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-xl font-semibold mb-4">
                <Skeleton className="w-40 h-6" />
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, index) => (
                    <CourseCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
