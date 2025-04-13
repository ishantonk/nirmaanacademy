import { NextRequest, NextResponse } from "next/server";
import {
    getAllCategories,
    getCategoriesWithCount,
} from "@/lib/services/category";

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
                return NextResponse.json(
                    { message: "No categories found." },
                    { status: 204 } // No Content
                );
            }

            return NextResponse.json(categories, { status: 200 });
        }

        // If no "count" is provided, fetch all categories
        const categories = await getAllCategories();

        // Optional: Handle case where no categories exist
        if (categories.length === 0) {
            return NextResponse.json(
                { message: "No categories available." },
                { status: 204 } // No Content
            );
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

// todo: add put request for editing category.
// todo: add post request for creating new category.
