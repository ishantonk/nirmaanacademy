import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Razorpay from "razorpay";
import { getAuthSession } from "@/lib/auth";
import { getCartItems } from "@/lib/services/cart";
import { createOrder } from "@/lib/services/order";

const checkoutSchema = z.object({
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

        const cartItems = await getCartItems(userId);
        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json([], { status: 200 }); // Your cart is empty.
        }

        const total = cartItems.reduce((acc, item) => {
            if (!item.course) return 0;
            let price = item.course.price;
            if (item.course.onSale) {
                price = item.course.discountPrice ?? item.course.price;
            }
            return acc + Number(price);
        }, 0);

        // Verify amount matches cart total
        if (total !== body.amount) {
            return NextResponse.json({ message: "Amount mismatch" });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(total * 100), // Convert to smallest currency unit (paise)
            currency: "INR",
            receipt: `order_${Date.now()}`,
        });

        const order = await createOrder({
            userId: userId,
            amount: total,
            razorpayOrderId: razorpayOrder.id,
            cartItems: cartItems,
        });

        if (!order) {
            return NextResponse.json({
                message: "Unable to create order database.",
            });
        }

        return NextResponse.json({
            id: order.id,
            amount: razorpayOrder.amount,
            razorpayOrderId: razorpayOrder.id,
        });
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
