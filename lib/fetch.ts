import { CategoryType, CourseType, FacultyType } from "@/lib/types";

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

// Fetch course function which uses the slug parameters.
export async function fetchCourseBySlug(slug: string): Promise<CourseType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses/${slug}`
    );
    if (response.ok) return await response.json();
    throw new Error(`Failed to fetch course with slug: ${slug}`);
}

// Fetch faculties function
export async function fetchFaculties(): Promise<FacultyType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/faculty`
    );
    if (response.ok) return await response.json();
    throw new Error(`Failed to fetch faculties`);
}

// Fetch function for checking course is in cart which uses the course id parameters.
export async function fetchIsInCart(courseId: string): Promise<boolean> {
    // Use a proper query parameter key for courseId
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart/check?courseId=${courseId}`
    );

    if (response.ok) {
        // Assuming the API returns a JSON object like { isInCart: true }
        const data = await response.json();
        return data.isInCart ?? false;
    }
    return false;
}
