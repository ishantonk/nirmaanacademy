import { prisma } from "@/lib/prisma";
import { AdminAttemptFormValues, AttemptType } from "@/lib/types";

export async function getAttempts(): Promise<AttemptType[]> {
    try {
        return await prisma.attempt.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error find course attempts:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findAttemptBySlug(
    slug: string
): Promise<AttemptType | null> {
    try {
        return await prisma.attempt.findUnique({
            where: {
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error find course attempt with this slug:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findAttemptById(id: string): Promise<AttemptType | null> {
    try {
        return await prisma.attempt.findUnique({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error find course attempt with this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function createAttempt({
    slug,
    ...data
}: AdminAttemptFormValues & { slug: string }): Promise<AttemptType> {
    try {
        return await prisma.attempt.create({
            data: {
                ...data,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error creating course attempt:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function updateAttempt({
    id,
    slug,
    ...data
}: AdminAttemptFormValues & {
    id: string;
    slug: string;
}): Promise<AttemptType> {
    try {
        return await prisma.attempt.update({
            where: {
                id: id,
            },
            data: {
                ...data,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error updating course attempt:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function removeAttempt(id: string): Promise<AttemptType> {
    try {
        return await prisma.attempt.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error deleting course attempt:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
