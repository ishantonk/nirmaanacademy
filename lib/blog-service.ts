import { prisma } from "@/lib/prisma";
import { BlogPostType } from "@/lib/types";

export async function getAllBlogs(): Promise<BlogPostType[]> {
    return await prisma.post.findMany({
        where: {
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    name: true,
                    bio: true,
                    image: true,
                },
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                    description: true,
                },
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
    });
}

// Get course by slug
export async function getBlogBySlug(
    slug: string
): Promise<BlogPostType | null> {
    return await prisma.post.findUnique({
        where: {
            slug,
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    name: true,
                    bio: true,
                    image: true,
                },
            },
            category: {
                select: {
                    name: true,
                    slug: true,
                    description: true,
                },
            },
            tags: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });
}
