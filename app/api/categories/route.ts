import { NextRequest, NextResponse } from "next/server";
import {
    createCategory,
    findCategoryBySlug,
    getAllCategories,
    getCategoriesWithCount,
} from "@/lib/services/category";
import { getAuthSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { zCategoriesSchema } from "@/lib/types";

/**
 * GET API handler to retrieve course categories.
 * Optional query param:
 * - `count`: If provided, returns a limited number of categories with course counts.
 */
export async function GET(request: NextRequest) {
    // Extract query parameter "count"
    const searchParams = request.nextUrl.searchParams;
    const countParam = searchParams.get("count");
    const count = Number(countParam);

    try {
        // If "count" is provided and is a valid positive number
        if (countParam !== null) {
            if (isNaN(count) || count < 1) {
                // If count is invalid (e.g., non-numeric or less than 1), return 400 Bad Request
                return NextResponse.json(
                    { error: "'count' must be a positive number." },
                    { status: 400 }
                );
            }

            // Fetch limited categories with course counts
            const categories = await getCategoriesWithCount(count);

            // Check for empty result
            if (categories.length === 0) {
                return NextResponse.json([], { status: 200 }); // No categories found.
            }

            return NextResponse.json(categories, { status: 200 });
        }

        // If no "count" is provided, fetch all categories
        const categories = await getAllCategories();

        // Optional: Handle case where no categories exist
        if (categories.length === 0) {
            return NextResponse.json([], { status: 200 }); // No categories found.
        }

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching categories:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to fetch categories due to server error." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
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
        const { name, description } = zCategoriesSchema.parse(body);
        const slug = slugify(name);

        // Checking for admin user.
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Find if same category exist already.
        const existingCategory = await findCategoryBySlug({ slug: slug });
        if (existingCategory) {
            return NextResponse.json(
                { message: "Category is already exist." },
                { status: 400 }
            );
        }

        // Creating new category.
        const category = await createCategory({
            name: name,
            description: description,
            slug: slug,
        });
        if (!category) {
            return NextResponse.json(
                { message: "Unable to creating new category." },
                { status: 400 }
            );
        }

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating category:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to create category due to server error." },
            { status: 500 }
        );
    }
}
