import { NextRequest, NextResponse } from "next/server";
import { findBlogBySlug } from "@/lib/services/blog";

/**
 * GET /api/blogs/:slug
 * This endpoint retrieves a single blog post by its slug.
 */
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        // Destructure slug from dynamic route parameters
        const { slug } = await context.params;

        // Validate the slug param is present and not empty
        if (!slug || typeof slug !== "string") {
            return NextResponse.json(
                { error: "Invalid or missing blog slug." },
                { status: 400 } // Bad Request
            );
        }

        // Fetch the blog post using the provided slug
        const blog = await findBlogBySlug(slug);

        // Handle case: Blog not found
        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found." },
                { status: 404 }
            );
        }

        // Handle case: Blog exists but is marked private (optional condition)
        if (blog.status !== "PUBLISHED") {
            return NextResponse.json(
                { error: "This blog post is private(Post is ARCHIVED or DRAFT)." },
                { status: 403 }
            );
        }

        // Return the blog post with success
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        // Log the error for internal debugging
        console.error("Error fetching blog post:", error);

        // Handle specific known database/network issues
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Return a generic 500 response for all other unknown errors
        return NextResponse.json(
            { error: "Failed to fetch blog due to a server error." },
            { status: 500 }
        );
    }
}
