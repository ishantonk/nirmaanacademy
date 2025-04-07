import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const post = await prisma.post.findUnique({
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

        if (!post) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}
