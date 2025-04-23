import { NextRequest, NextResponse } from "next/server";
import {
    updateCategory,
    findCategoryById,
    deleteCategory,
} from "@/lib/services/category";
import { getAuthSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { zCategoriesSchema } from "@/lib/types";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: categoryId } = await context.params;

        // Validate session
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate id context params
        if (!categoryId) {
            return NextResponse.json(
                { message: "Category ID is required" },
                { status: 400 }
            );
        }

        // Validate request body
        if (!request.body) {
            return NextResponse.json(
                { message: "Request body is required" },
                { status: 400 }
            );
        }

        // Parse the request body
        const body = await request.json();
        const { name, description } = zCategoriesSchema.parse(body);
        // Check if the request body contains valid data
        if (!name || !description) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        const existing = await findCategoryById({ id: categoryId });
        if (!existing) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        const updated = await updateCategory({
            id: categoryId,
            name,
            description,
            slug: slugify(name),
        });

        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update category" },
                { status: 400 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating category:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { message: "Internal server error. Failed to update category." },
            { status: 500 }
        );
    }
}

/**
 * DELETE API handler to remove a category by ID.
 * Only accessible by admin users.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: categoryId } = await context.params;

        // Validate id context params
        if (!categoryId) {
            return NextResponse.json(
                { message: "Category ID is required" },
                { status: 400 }
            );
        }

        // Authenticate the user session
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        // Check if the category exists
        const existingCategory = await findCategoryById({ id: categoryId });
        if (!existingCategory) {
            return NextResponse.json(
                { message: "Category not found." },
                { status: 404 }
            );
        }

        // Delete the category
        const deletedCategory = await deleteCategory({ id: categoryId });
        if (!deletedCategory) {
            return NextResponse.json(
                { message: "Failed to delete category." },
                { status: 400 }
            );
        }

        return NextResponse.json(deletedCategory, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting category:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { message: "Internal server error. Failed to delete category." },
            { status: 500 }
        );
    }
}
