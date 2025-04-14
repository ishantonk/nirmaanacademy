import { prisma } from "@/lib/prisma";
import { CartItemType } from "@/lib/types";

interface CreateOrderProps {
    userId: string;
    amount: number;
    razorpayOrderId: string;
    cartItems: CartItemType[];
}

export async function createOrder({
    userId,
    amount,
    razorpayOrderId,
    cartItems,
}: CreateOrderProps) {
    try {
        return await prisma.order.create({
            data: {
                userId: userId,
                amount: amount,
                status: "PENDING",
                razorpayOrderId: razorpayOrderId,
                orderItems: {
                    create: cartItems
                        .map((item) => {
                            if (item.course) {
                                return {
                                    courseId: item.course.id,
                                    price: item.course.price,
                                    attemptId: item.attemptId,
                                    modeId: item.modeId,
                                };
                            }
                            return null;
                        })
                        .filter((orderItem) => orderItem !== null),
                },
            },
        });
    } catch (error) {
        console.error("Error on making order:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
