import { prisma } from "@/lib/prisma";
import { EnrollmentType } from "@/lib/types";

export async function getEnrollments(
    userId: string
): Promise<EnrollmentType[]> {
    return await prisma.enrollment.findMany({
        where: {
            userId: userId,
        },
        include: {
            course: {
                include: {
                    category: true,
                    faculties: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findEnrollment(
    userId: string,
    courseId: string
): Promise<EnrollmentType | null> {
    return await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: userId,
                courseId: courseId,
            },
        },
    });
}

// todo: create a function for creating new enrollment.
