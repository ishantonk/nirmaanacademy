"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { CourseGrid } from "@/components/course/course-grid";
import { CourseCard } from "@/components/course/course-card";
import { CourseCardSkeleton } from "@/components/course/course-card-skeleton";
import { CourseType } from "@/lib/types";

interface LiveCoursesProps {
    initialCategory?: string;
    initialSearch?: string;
    initialPrice?: string;
    initialSort?: string;
}

// Fetch function which uses the current query parameters.
async function fetchCourses(queryParams: string): Promise<CourseType[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses?${queryParams}`
    );
    if (!res.ok) throw new Error("Error fetching courses");
    return res.json();
}

export function CoursesLive({
    initialCategory,
    initialSearch,
    initialPrice,
    initialSort,
}: LiveCoursesProps) {
    // Local state for the search input (initial value passed from server).
    const [search, setSearch] = useState(initialSearch || "");
    // Use debounce so that API calls are limited while the user types.
    const [debouncedSearch] = useDebounce(search, 500);

    // Build query parameters based on the current live search and initial filter values.
    const params = new URLSearchParams();
    if (initialCategory) params.append("category", initialCategory);
    if (initialPrice) params.append("price", initialPrice);
    if (initialSort) params.append("sort", initialSort);
    if (debouncedSearch) params.append("search", debouncedSearch);

    const queryString = params.toString();

    // Use React Query to fetch courses based on the query string.
    const { data, isLoading, error } = useQuery({
        queryKey: ["live-courses", queryString],
        queryFn: () => fetchCourses(queryString),
        // You may add options here such as refetchOnWindowFocus if needed.
    });

    return (
        <div>
            {/* Live Search Input */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Course Results */}
            {isLoading ? (
                <CourseGrid
                    courses={Array.from({ length: 6 }).map((_, i) => (
                        <CourseCardSkeleton key={i} />
                    ))}
                />
            ) : error ? (
                <div className="p-4 text-center">
                    <p>Error loading courses.</p>
                </div>
            ) : data && data.length === 0 ? (
                <EmptyState
                    title="No courses found"
                    description="We couldn't find any courses matching your criteria."
                    action={null}
                />
            ) : (
                <CourseGrid
                    courses={(data ?? []).map((course) => (
                        <CourseCard
                            key={course.id}
                            href={`/courses/${course.slug}`}
                            course={course}
                        />
                    ))}
                />
            )}
        </div>
    );
}
