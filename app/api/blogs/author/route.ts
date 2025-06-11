import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { findBlogsByAuthorIdAdmin } from "@/lib/services/blog";

// Handles GET request to fetch blogs for the currently authenticated admin/author
export async function GET() {
    try {
        // Retrieve session to identify the current user
        const session = await getAuthSession();

        // Check if the session or user info is missing (unauthorized access)
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                {
                    error: "Unauthorized access. Please log in to view your blogs.",
                },
                { status: 401 }
            );
        }

        const authorId = session.user.id;

        // Fetch blogs associated with the author/admin
        const authorsBlogs = await findBlogsByAuthorIdAdmin(authorId);

        // If no blogs are found for the author
        if (!authorsBlogs || authorsBlogs.length === 0) {
            return NextResponse.json(
                { error: `No blog posts found for user ID: ${authorId}` },
                { status: 404 }
            );
        }

        // Return the found blogs with a success status
        return NextResponse.json(authorsBlogs, { status: 200 });
    } catch (error) {
        // Log the error for internal debugging
        console.error("Error fetching blog posts:", error);

        // Handle specific known error (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                {
                    error: "Unable to connect to the database. Please try again later.",
                },
                { status: 503 }
            );
        }

        // Fallback for any unknown errors
        return NextResponse.json(
            {
                error: "An unexpected server error occurred while fetching blogs.",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
