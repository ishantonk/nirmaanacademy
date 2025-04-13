import { prisma } from "@/lib/prisma";
import { CategoryType } from "@/lib/types";

export async function getCategoriesWithCount(
    count: number
): Promise<CategoryType[]> {
    return await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    courses: {
                        where: {
                            status: "PUBLISHED",
                        },
                    },
                },
            },
        },
        orderBy: {
            courses: {
                _count: "desc",
            },
        },
        take: count,
    });
}

export async function getAllCategories(): Promise<CategoryType[]> {
    return await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

// todo: create a new function for creating new category.
// todo: create a function for updating a category.