import { NextRequest, NextResponse } from "next/server";
import {
    deleteCourseBySlug,
    getCourseBySlug,
    updateCourse,
    updateCourseStatus,
} from "@/lib/services/course";
import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { zCourseSchema, zCourseStatusUpdateSchema } from "@/lib/types";

/**
 * GET API endpoint to retrieve a course by its slug.
 * Expects a dynamic route parameter `slug` (e.g., /api/courses/[slug])
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        // Await the route params to extract the slug value
        const { slug } = await context.params;

        // Validate if slug is provided
        if (!slug || typeof slug !== "string") {
            return NextResponse.json(
                { error: "Invalid or missing course slug." },
                { status: 400 } // Bad Request
            );
        }

        // Attempt to fetch the course using the slug
        const course = await getCourseBySlug({ slug: slug });

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

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        // Await the route params to extract the slug value
        const { slug } = await context.params;

        // Check for user session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const userRole = session.user.role;

        // Validate request body
        const body = await request.json();
        const { status, featured } = zCourseStatusUpdateSchema.parse(body);

        // Checking for admin user.
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const updatedCourse = await updateCourseStatus({
            slug,
            status,
            featured,
        });

        if (!updatedCourse) {
            return NextResponse.json(
                { message: "Unable to update course status." },
                { status: 400 }
            );
        }

        return NextResponse.json(updatedCourse, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating course status:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic server error response
        return NextResponse.json(
            { error: "Failed to update course status due to a server error." },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        // Await the route params to extract the slug value
        const { slug } = await context.params;

        // Check for user session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const userRole = session.user.role;

        // Validate request body
        const body = await request.json();
        const data = zCourseSchema.parse(body);

        // Checking for admin user.
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const updatedCourse = await updateCourse({ ...data, slug });

        if (!updatedCourse) {
            return NextResponse.json(
                { message: "Unable to update course status." },
                { status: 400 }
            );
        }

        return NextResponse.json(updatedCourse, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating course:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic server error response
        return NextResponse.json(
            { error: "Failed to update course due to a server error." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        // Check for user session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const userRole = session.user.role;

        // Only admins can delete courses
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const deletedCourse = await deleteCourseBySlug(slug);

        if (!deletedCourse) {
            return NextResponse.json(
                { message: "Course not found or could not be deleted." },
                { status: 404 }
            );
        }

        return NextResponse.json(deletedCourse, { status: 200 });
    } catch (error) {
        console.error("Error deleting course:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Failed to delete course due to a server error." },
            { status: 500 }
        );
    }
}
