import { NextRequest, NextResponse } from "next/server";
import { getBlogBySlug } from "@/lib/blog-service";

export async function GET(
    request: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = context.params;
        const post = await getBlogBySlug(slug ? slug : "");

        if (!post) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog" },
            { status: 500 }
        );
    }
}
