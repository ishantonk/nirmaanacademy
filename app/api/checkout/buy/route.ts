import { getAuthSession } from "@/lib/auth";
import { findCourseById } from "@/lib/services/course";
import { createOrderByCourse } from "@/lib/services/order";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const checkoutSchema = z.object({
    courseId: z.string().min(2),
    amount: z.number().positive(),
    name: z.string().min(2),
    email: z.string().email(),
});

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
        const json = await request.json();
        const body = checkoutSchema.parse(json);

        const course = await findCourseById(body.courseId);
        if (!course) {
            return NextResponse.json(
                { error: "Unable to find your course." },
                { status: 404 }
            );
        }

        // Extract and normalize prices
        const price = Number(course.price);
        const discountPrice = Number(course.discountPrice);
        const isOnSale =
            course.onSale && discountPrice && price && discountPrice < price;
        const currentPrice = isOnSale ? discountPrice : price;

        const attemptId = course.availableAttempts?.[0].id;
        const modeId = course.availableModes?.[0].id;

        // Verify amount matches cart total
        if (currentPrice !== body.amount) {
            return NextResponse.json({ message: "Amount mismatch" });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(currentPrice * 100), // Convert to smallest currency unit (paise)
            currency: "INR",
            receipt: `order_${Date.now()}`,
        });

        const order = await createOrderByCourse({
            userId: userId,
            razorpayOrderId: razorpayOrder.id,
            attemptId: attemptId,
            modeId: modeId,
            currentPrice: currentPrice,
            course: course,
        });

        if (!order) {
            return NextResponse.json({
                message: "Unable to create order database.",
            });
        }

        return NextResponse.json(
            {
                id: order.id,
                amount: razorpayOrder.amount,
                razorpayOrderId: razorpayOrder.id,
            },
            { status: 200 }
        );
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error checking out:", error);

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
            { message: "Internal server error. Failed to checkout." },
            { status: 500 }
        );
    }
}
