import { prisma } from "@/lib/prisma";
import { EnrollmentType } from "@/lib/types";

export async function getEnrollments(
    userId: string
): Promise<EnrollmentType[]> {
    try {
        return await prisma.enrollment.findMany({
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
        console.error("Error on fetching enrollment list:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findEnrollment(
    userId: string,
    courseId: string
): Promise<EnrollmentType | null> {
    try {
        return await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                },
            },
        });
    } catch (error) {
        console.error("Error on finding your enrollment:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface CreateEnrollmentProps {
    userId: string;
    courseId: string;
}

export async function createEnrollment({
    userId,
    courseId,
}: CreateEnrollmentProps) {
    try {
        return await prisma.enrollment.create({
            data: {
                userId: userId,
                courseId: courseId,
            },
        });
    } catch (error) {
        console.error("Error on making you enroll in this course:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
