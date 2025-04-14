import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHmac } from "crypto";
import { getAuthSession } from "@/lib/auth";
import { findOrderById, updateOrderById } from "@/lib/services/order";
import { createEnrollment } from "@/lib/services/enrollment";
import { EnrollmentType } from "@/lib/types";
import { emptyUserCart } from "@/lib/services/cart";

const verifySchema = z.object({
    orderId: z.string(),
    paymentId: z.string(),
    signature: z.string(),
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
        const body = verifySchema.parse(json);

        // Get order from database
        const order = await findOrderById({ orderId: body.orderId });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        if (order.userId !== userId) {
            return NextResponse.json(
                {
                    error: "Forbidden. You are not allowed to find other user order.",
                },
                { status: 403 }
            );
        }

        // Verify payment signature
        const text = `${order.razorpayOrderId}|${body.paymentId}`;
        const generatedSignature = createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET!
        )
            .update(text)
            .digest("hex");

        if (generatedSignature !== body.signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Update order status
        const orderComplete = await updateOrderById({
            orderId: order.id,
            paymentId: body.paymentId,
        });

        if (!orderComplete) {
            return NextResponse.json({ error: "Unable to complete order." });
        }

        const notEnrolled: Array<EnrollmentType> = [];
        // Create enrollments for purchased courses
        for (const item of order.orderItems) {
            const enrollment = await createEnrollment({
                userId: userId,
                courseId: item.courseId,
            });
            if (!enrollment) {
                notEnrolled.push(enrollment);
            }
        }

        // Checking if there is any course left for any reason for enroll from your order.
        if (notEnrolled) {
            return NextResponse.json({
                error: "Unable to enroll in these courses:",
                notEnrolledList: notEnrolled,
            });
        }

        // Clear user's cart
        const emptyCart = await emptyUserCart({ userId: userId });
        if (!emptyCart) {
            return NextResponse.json({ error: "Unable to empty your cart." });
        }

        return NextResponse.json(
            { message: "Payment verified successfully" },
            { status: 200 }
        );
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on verify order:", error);

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
