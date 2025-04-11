import { prisma } from "@/lib/prisma";
import { EnrollmentType } from "@/lib/types";

export async function getEnrollments(
    userId: string
): Promise<EnrollmentType[]> {
    return await prisma.enrollment.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
