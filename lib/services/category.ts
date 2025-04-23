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
            name: "asc",
        },
    });
}

export async function findCategoryBySlug({ slug }: { slug: string }) {
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

export async function findCategoryById({ id }: { id: string }) {
    try {
        return await prisma.category.findFirst({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error on finding category by this ID:", error);
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

export async function updateCategory({
    id,
    name,
    description,
    slug,
}: CreateCategoryProps & { id: string }) {
    try {
        return await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error on updating category by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function deleteCategory({ id }: { id: string }) {
    try {
        return await prisma.category.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error on deleting category by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getCategoryCourses({ id }: { id: string }) {
    try {
        return await prisma.category.findUnique({
            where: {
                id: id,
            },
            include: {
                courses: {
                    where: {
                        status: "PUBLISHED",
                    },
                },
            },
        });
    } catch (error) {
        console.error("Error on getting category courses by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getCategoryCoursesCount({ id }: { id: string }) {
    try {
        return await prisma.category.findUnique({
            where: {
                id: id,
            },
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
        });
    } catch (error) {
        console.error("Error on getting category courses count by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
