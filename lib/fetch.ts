import { CategoryType, CourseType } from "@/lib/types";

// Fetch category function which uses the current count parameters.
export async function fetchCategories(count?: number): Promise<CategoryType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories${
            count !== undefined ? `?count=${encodeURIComponent(count)}` : ""
        }`
    );
    if (response.ok) return await response.json();
    return [];
}

// Fetch courses function which uses the current query parameters.
export async function fetchCourses(
    queryParams?: string
): Promise<CourseType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses${
            queryParams ? `?${queryParams}` : ""
        }`
    );
    if (response.ok) return await response.json();
    return [];
}
