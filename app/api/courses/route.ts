import { NextRequest, NextResponse } from "next/server";
import { findCourseById, getCourses } from "@/lib/services/course";

/**
 * GET API handler to retrieve courses based on filters or a single course by ID.
 * Supports optional query parameters:
 * - id: Fetch a specific course
 * - category: Filter by category
 * - search: Search by title/keywords
 * - price: Filter by price (e.g. "free", "paid")
 * - sort: Sort by criteria (e.g. "newest", "popular")
 * - featured: Boolean flag to show featured courses
 * - count: Limit the number of returned courses
 */
export async function GET(request: NextRequest) {
    // Extract query parameters from the URL
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured") === "true";
    const count = Number(searchParams.get("count"));

    try {
        // If an ID is provided, fetch a single course
        if (id) {
            const course = await findCourseById(id);

            // Handle case when course is not found
            if (!course) {
                return NextResponse.json([], { status: 200 }); // Course not found.
            }

            return NextResponse.json(course, { status: 200 });
        }

        // Validate "count" if provided (should be a positive number)
        if (!isNaN(count) && count < 0) {
            return NextResponse.json(
                { error: "'count' must be a positive number." },
                { status: 400 }
            );
        }

        // Fetch filtered list of courses
        const courses = await getCourses(
            category,
            search,
            price,
            sort,
            isNaN(count) ? undefined : count,
            featured
        );

        // Handle case where no courses match the filters
        if (Array.isArray(courses) && courses.length === 0) {
            return NextResponse.json(
                { message: "No courses found matching the criteria." },
                { status: 204 } // No Content
            );
        }

        // Return the list of courses
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        // Log unexpected server errors
        console.error("Error fetching courses:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        return NextResponse.json(
            { error: "Failed to fetch courses due to a server error." },
            { status: 500 }
        );
    }
}
