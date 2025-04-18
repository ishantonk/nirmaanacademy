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

interface FindCategoryBySlugProps {
    slug: string;
}

export async function findCategoryBySlug({ slug }: FindCategoryBySlugProps) {
    try {
        return await prisma.category.findFirst({
            where: {
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error on finding category by this slug:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface CreateCategoryProps {
    name: string;
    description?: string;
    slug: string;
}

export async function createCategory({
    name,
    description,
    slug,
}: CreateCategoryProps) {
    try {
        return await prisma.category.create({
            data: {
                name: name,
                description: description,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error on creating new category by this data:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

// todo: create a function for updating a category.
