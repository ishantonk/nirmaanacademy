import { prisma } from "@/lib/prisma";
import { AdminModeFormValues, ModeType } from "@/lib/types";

export async function getModes(): Promise<ModeType[]> {
    try {
        return await prisma.mode.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error find course modes:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findModeBySlug(slug: string): Promise<ModeType | null> {
    try {
        return await prisma.mode.findUnique({
            where: {
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error find course mode with this slug:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findModeById(id: string): Promise<ModeType | null> {
    try {
        return await prisma.mode.findUnique({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error find course mode with this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function createMode({
    slug,
    ...data
}: AdminModeFormValues & { slug: string }): Promise<ModeType> {
    try {
        return await prisma.mode.create({
            data: {
                ...data,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error creating course mode:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function updateMode({
    id,
    slug,
    ...data
}: AdminModeFormValues & { id: string; slug: string }): Promise<ModeType> {
    try {
        return await prisma.mode.update({
            where: {
                id: id,
            },
            data: {
                ...data,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error updating course mode:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function removeMode(id: string): Promise<ModeType> {
    try {
        return await prisma.mode.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error deleting course mode:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
