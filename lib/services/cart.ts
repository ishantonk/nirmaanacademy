import { prisma } from "@/lib/prisma";
import { CartItemType } from "@/lib/types";

interface CreateCartItemProps {
    userId: string;
    courseId: string;
    attemptId: string;
    modeId: string;
}

export async function CreateCartItem({
    userId,
    courseId,
    attemptId,
    modeId,
}: CreateCartItemProps): Promise<CartItemType> {
    try {
        return await prisma.cartItem.create({
            data: {
                userId: userId,
                courseId: courseId,
                attemptId: attemptId,
                modeId: modeId,
            },
        });
    } catch (error) {
        console.log("Error adding course in cart:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findCartItemById(
    userId: string,
    id: string
): Promise<CartItemType | null> {
    try {
        return await prisma.cartItem.findUnique({
            where: {
                id: id,
                userId: userId,
            },
        });
    } catch (error) {
        console.error("Error checking course in cart:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findCartItemByCourseId(
    userId: string,
    courseId: string
): Promise<CartItemType | null> {
    try {
        return await prisma.cartItem.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                },
            },
        });
    } catch (error) {
        console.error("Error checking course in cart:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function removeCourseFromCartByCourseId(
    userId: string,
    courseId: string
): Promise<CartItemType> {
    try {
        return await prisma.cartItem.delete({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                },
            },
        });
    } catch (error) {
        console.error("Error finding cart list:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface EmptyUserCartProps {
    userId: string;
}

export async function emptyUserCart({ userId }: EmptyUserCartProps) {
    try {
        return await prisma.cartItem.deleteMany({
            where: {
                userId: userId,
            },
        });
    } catch (error) {
        console.error("Error on emptying user cart:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getCartItems({
    userId,
}: {
    userId: string;
}): Promise<CartItemType[]> {
    try {
        return await prisma.cartItem.findMany({
            where: {
                userId: userId,
            },
            include: {
                course: {
                    include: {
                        category: true,
                        faculties: true,
                        availableModes: true,
                        availableAttempts: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error finding cart list:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
