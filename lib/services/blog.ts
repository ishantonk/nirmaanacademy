import { prisma } from "@/lib/prisma";
import { AdminBlogFormValues, BlogPostType } from "@/lib/types";

export async function getBlogs(): Promise<BlogPostType[]> {
    try {
        return await prisma.post.findMany({
            where: {
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error finding blog posts:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogBySlug(
    slug: string
): Promise<BlogPostType | null> {
    try {
        return await prisma.post.findFirst({
            where: {
                slug: slug,
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
        });
    } catch (error) {
        console.error("Error finding blog:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogBySlugAdmin(
    slug: string
): Promise<BlogPostType | null> {
    try {
        return await prisma.post.findUnique({
            where: {
                slug: slug,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
        });
    } catch (error) {
        console.error("Error finding blog:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogById(id: string): Promise<BlogPostType | null> {
    try {
        return await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
        });
    } catch (error) {
        console.error("Error finding blog by ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogsByAuthorId(id: string): Promise<BlogPostType[]> {
    try {
        return await prisma.post.findMany({
            where: {
                authorId: id,
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error finding blog by author ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogsByCategoryId(
    id: string
): Promise<BlogPostType[]> {
    try {
        return await prisma.post.findMany({
            where: {
                categoryId: id,
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error finding blog by category ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findBlogsByTagId(id: string): Promise<BlogPostType[]> {
    try {
        return await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        id: id,
                    },
                },
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        bio: true,
                        image: true,
                    },
                },
                category: true,
                tags: true,
            },
            orderBy: {
                publishedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error finding blog by tag ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function createBlog({
    slug,
    authorId,
    readTimeMinutes,
    ...data
}: AdminBlogFormValues & {
    slug: string;
    authorId: string;
    readTimeMinutes: number;
}): Promise<BlogPostType | null> {
    try {
        const newBlog = await prisma.post.create({
            data: {
                ...data,
                slug: slug,
                authorId: authorId,
                readTimeMinutes: readTimeMinutes,
                tags: {
                    connect: (data.tags ?? []).map((tagId: string) => ({
                        id: tagId,
                    })),
                },
            },
        });
        return newBlog;
    } catch (error) {
        console.error("Error creating blog:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
