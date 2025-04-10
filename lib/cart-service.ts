import { prisma } from "@/lib/prisma";

export async function checkCourseInCart({
    courseId,
    userId,
}: {
    courseId: string;
    userId: string;
}): Promise<boolean> {
    try {
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                userId,
                courseId,
            },
        });
        return !!cartItem;
    } catch (error) {
        console.error("Error checking course in cart:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
