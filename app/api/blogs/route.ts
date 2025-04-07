import { NextResponse } from "next/server";
import { getAllBlogs } from "@/lib/blog-service";

export async function GET() {
    try {
        const posts = await getAllBlogs();

        if (!posts) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch blog posts" },
            { status: 500 }
        );
    }
}
