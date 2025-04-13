import { prisma } from "@/lib/prisma";
import { BlogPostType } from "@/lib/types";

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
