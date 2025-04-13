import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { getAuthSession } from "@/lib/auth";
import { findEnrollment } from "@/lib/services/enrollment";
import { findCourseById } from "@/lib/services/course";
import {
    AddItemToCart,
    findCartItemByCourseId,
    getCartItems,
} from "@/lib/services/cart";

// Schema to validate incoming cart item data
const cartItemSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
});

/**
 * POST /api/cart
 * Adds a course to the user's cart after validation.
 */
export async function POST(request: NextRequest) {
    try {
        // Check for authenticated session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access. Please log in." },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Validate request body
        const body = await request.json();
        const { courseId } = cartItemSchema.parse(body);

        // Check if the course exists
        const course = await findCourseById(courseId);
        if (!course) {
            return NextResponse.json(
                { message: "Course not found." },
                { status: 404 }
            );
        }

        // Prevent adding if user is already enrolled
        const enrollment = await findEnrollment(userId, courseId);
        if (enrollment) {
            return NextResponse.json(
                { message: "You are already enrolled in this course." },
                { status: 400 }
            );
        }

        // Prevent duplicates in the cart
        const existingCartItem = await findCartItemByCourseId(userId, courseId);
        if (existingCartItem) {
            return NextResponse.json(
                { message: "Course is already in your cart." },
                { status: 400 }
            );
        }

        // Add the course to cart
        const cartItem = await AddItemToCart(userId, courseId);

        // Return success with 201 Created
        return NextResponse.json(cartItem, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error adding to cart:", error);

        // Handle schema validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid request data.", errors: error.errors },
                { status: 400 }
            );
        }

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { message: "Internal server error. Failed to add to cart." },
            { status: 500 }
        );
    }
}

/**
 * GET /api/cart
 * Fetches cart items or checks if a specific course is in the user's cart.
 * Optional query param:
 * - courseId: if provided, checks if this course is already in the cart.
 */
export async function GET(request: NextRequest) {
    try {
        // Check for user session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const searchParams = request.nextUrl.searchParams;
        const courseId = searchParams.get("courseId");

        // If courseId is provided, check if it's in the cart
        if (courseId) {
            const isInCart = await findCartItemByCourseId(userId, courseId);
            if (isInCart) {
                return NextResponse.json(isInCart, { status: 200 });
            } else {
                return NextResponse.json(
                    { message: "Course not in cart." },
                    { status: 404 }
                );
            }
        }

        // If no courseId, fetch all cart items
        const cartItems = await getCartItems(userId);
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json(
                { message: "Your cart is empty." },
                { status: 204 } // No Content
            );
        }

        return NextResponse.json(cartItems, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching cart items:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { message: "Internal server error. Failed to fetch cart items." },
            { status: 500 }
        );
    }
}
