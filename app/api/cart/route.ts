import { NextResponse } from "next/server";
import * as z from "zod";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartItemType } from "@/lib/types";

const cartItemSchema = z.object({
    courseId: z.string(),
});

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { courseId } = cartItemSchema.parse(body);

        // Check if course exists and is published
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                status: "PUBLISHED",
            },
        });

        if (!course) {
            return NextResponse.json(
                { message: "Course not found" },
                { status: 404 }
            );
        }

        // Check if user is already enrolled in the course
        const enrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        });

        if (enrollment) {
            return NextResponse.json(
                { message: "You are already enrolled in this course" },
                { status: 400 }
            );
        }

        // Check if course is already in cart
        const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        });

        if (existingCartItem) {
            return NextResponse.json(
                { message: "Course is already in your cart" },
                { status: 400 }
            );
        }

        // Add course to cart
        const cartItem = await prisma.cartItem.create({
            data: {
                userId: session.user.id,
                courseId,
            },
        });

        return NextResponse.json(cartItem, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid request data", errors: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getAuthSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const cartItems: CartItemType[] = await prisma.cartItem.findMany({
            where: {
                userId: session?.user.id,
            },
            select: {
                id: true,
                courseId: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        price: true,
                        discountPrice: true,
                        thumbnail: true,
                        onSale: true,
                        faculties: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(cartItems || [], { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
