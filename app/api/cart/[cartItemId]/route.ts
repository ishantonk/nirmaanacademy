import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import {
    findCartItemById,
    removeCourseFromCartByCourseId,
} from "@/lib/services/cart";

/**
 * DELETE /api/cart/:cartItemId
 * Removes a specific cart item by its ID for the authenticated user.
 */
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ cartItemId: string }> }
) {
    // Extract the cartItemId from dynamic route params
    const { cartItemId } = await context.params;

    try {
        // Validate user session (authentication)
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Validate the cart item exists and belongs to the user
        const cartItem = await findCartItemById(userId, cartItemId);
        if (!cartItem) {
            return NextResponse.json(
                { message: "Cart item not found." },
                { status: 404 }
            );
        }

        // Authorization check – ensure the cart item belongs to the user
        if (cartItem.userId !== userId) {
            return NextResponse.json(
                {
                    message:
                        "Forbidden. You are not allowed to delete this item.",
                },
                { status: 403 }
            );
        }

        // Remove the cart item using its courseId
        const courseId = cartItem.courseId;
        const removedCartItem = await removeCourseFromCartByCourseId(
            userId,
            courseId
        );

        // Return a success response
        return NextResponse.json(
            {
                removedCartItem,
                message: "Cart item successfully removed.",
            },
            { status: 200 }
        );
    } catch (error) {
        // Log unexpected errors for debugging
        console.error("Error while deleting cart item:", error);

        // Handle known errors (e.g., DB connection failure)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Generic server error response
        return NextResponse.json(
            { message: "Internal server error. Could not delete cart item." },
            { status: 500 }
        );
    }
}
