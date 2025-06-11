"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { CourseGrid } from "@/components/course/course-grid";
import { fetchCourses } from "@/lib/services/api";
import CourseCard, { CourseCardSkeleton } from "./course-card";

export function CoursesLive() {
    const searchParams = useSearchParams();

    // Get filter values from URL parameters directly.
    const categoryFromUrl = searchParams.get("category") || "";
    const priceFromUrl = searchParams.get("price") || "";
    const sortFromUrl = searchParams.get("sort") || "";
    const searchFromUrl = searchParams.get("search") || "";

    // We use state for the text input and debouncing.
    // This makes sure that if the user types in a new search term,
    // we debounce before making another API call.
    const [search, setSearch] = useState(searchFromUrl);
    const [debouncedSearch] = useDebounce(search, 500);

    // When the URL search param changes (for example via the filter UI),
    // update the search state accordingly.
    useEffect(() => {
        setSearch(searchFromUrl);
    }, [searchFromUrl]);

    // Build query parameters based on the current URL and debounced input.
    const params = new URLSearchParams();
    if (categoryFromUrl) params.append("category", categoryFromUrl);
    if (priceFromUrl) params.append("price", priceFromUrl);
    if (sortFromUrl) params.append("sort", sortFromUrl);
    if (debouncedSearch) params.append("search", debouncedSearch);

    const queryString = params.toString();

    // React Query triggers a refetch whenever the query key (queryString) changes.
    const { data, isLoading, error } = useQuery({
        queryKey: [queryString],
        queryFn: () => fetchCourses(queryString),
    });

    return (
        <div>
            {/* Live Search Input */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        name="search"
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
                        <CourseCard key={course.id} course={course} />
                    ))}
                />
            )}
        </div>
    );
}
