import { NextRequest, NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/services/course";

/**
 * GET API endpoint to retrieve a course by its slug.
 * Expects a dynamic route parameter `slug` (e.g., /api/courses/[slug])
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    // Await the route params to extract the slug value
    const { slug } = await context.params;

    try {
        // Validate if slug is provided
        if (!slug || typeof slug !== "string") {
            return NextResponse.json(
                { error: "Invalid or missing course slug." },
                { status: 400 } // Bad Request
            );
        }

        // Attempt to fetch the course using the slug
        const course = await getCourseBySlug(slug);

        // If no course is found, return a 404 Not Found
        if (!course) {
            return NextResponse.json(
                { error: "Course not found." },
                { status: 404 }
            );
        }

        // Return the course data if found
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching course:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic server error response
        return NextResponse.json(
            { error: "Failed to fetch course due to a server error." },
            { status: 500 }
        );
    }
}

// todo: add put request for updating course details.
