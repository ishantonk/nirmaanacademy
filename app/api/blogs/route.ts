import { NextRequest, NextResponse } from "next/server";
import { createBlog, findBlogBySlugAdmin, getBlogs } from "@/lib/services/blog";
import { getAuthSession } from "@/lib/auth";
import { zBlogSchema } from "@/lib/types";
import { calculateReadingTime, excerptByWords, slugify } from "@/lib/utils";

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
            return NextResponse.json([], { status: 200 }); // No blog records available.
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

export async function POST(request: NextRequest) {
    try {
        // Ensure the user is authenticated
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Ensure request has a JSON body
        if (!request.body) {
            return NextResponse.json(
                { message: "Request body is required." },
                { status: 400 }
            );
        }

        // Parse and validate the incoming data
        const body = await request.json();
        const data = zBlogSchema.parse(body);

        // If the excerpt is not provided, generate it from the content
        if (
            !data.excerpt ||
            data.excerpt === "" ||
            data.excerpt === null ||
            data.excerpt.length <= 20
        ) {
            data.excerpt = excerptByWords({
                content: data.content,
                maxChars: 300,
            });
        }

        // If the Featured Image alt text is not provided, set a default value
        if (!data.featuredImageAlt || data.featuredImageAlt === "") {
            data.featuredImageAlt = `Featured image for ${data.title}`;
        }

        // If the meta title is not provided, set a default value
        if (!data.metaTitle || data.metaTitle === "") {
            data.metaTitle = `Blog post: ${data.title}`;
        }

        // If the meta description is not provided, set a default value
        if (!data.metaDescription || data.metaDescription === "") {
            data.metaDescription = `Read this blog post: ${data.title}`;
        }

        // Calculate the read time based on the content length
        const readTimeMinutes = calculateReadingTime(data.content);

        // Set slug based on title
        const slug = slugify(data.title);

        // Check if the slug already exists
        const existingBlog = await findBlogBySlugAdmin(slug);
        if (existingBlog) {
            return NextResponse.json(
                { message: "Blog with this slug already exists." },
                { status: 409 }
            );
        }

        // Set the authorId to the current user's ID
        const authorId = session.user.id;

        // Create new blog entry
        const blog = await createBlog({
            slug,
            authorId,
            readTimeMinutes,
            ...data,
        });

        // If creation failed for some reason
        if (!blog) {
            return NextResponse.json(
                { message: "Failed to create blog." },
                { status: 500 }
            );
        }

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating blog:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to create blog due to server error." },
            { status: 500 }
        );
    }
}
