import { NextResponse } from "next/server";
import { getBlogs } from "@/lib/services/blog";

/**
 * GET /api/blogs
 * This route handler fetches all blog entries.
 */
export async function GET() {
    try {
        // Fetch all blogs from the blog service
        const blogs = await getBlogs();

        // If blogs is null or undefined, respond with a 404
        if (!blogs) {
            return NextResponse.json(
                { error: "No blogs found or data source unavailable." },
                { status: 404 }
            );
        }

        // If blogs is an empty array, respond with 204 No Content
        if (Array.isArray(blogs) && blogs.length === 0) {
            return NextResponse.json(
                { message: "No blog records available." },
                { status: 204 }
            );
        }

        // If blogs is not an array (unexpected format), return bad data error
        if (!Array.isArray(blogs)) {
            return NextResponse.json(
                { error: "Unexpected response format from blog service." },
                { status: 422 } // Unprocessable Entity
            );
        }

        // Return the blogs if everything is successful
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        // Log error for debugging
        console.error("Error fetching blog posts:", error);

        // Handle known error: database connection refused
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Fallback for any unknown server-side errors
        return NextResponse.json(
            { error: "Failed to fetch blog posts due to server error." },
            { status: 500 }
        );
    }
}
