import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                status: "PUBLISHED",
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                publishedAt: "desc",
            },
        });

        if (!posts) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}
