import { getAuthSession } from "@/lib/auth";
import { getTags, createTag } from "@/lib/services/tag";
import { zTagSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch all tags from the database
        const tags = await getTags();

        // If no tags exist, return an empty list instead of 404
        if (!tags) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error("Error fetching tags:", error);

        // Database connection issue
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        // Generic server error
        return NextResponse.json(
            { error: "Failed to fetch tags due to server error." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Ensure the user is authenticated
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Ensure request has a JSON body
        if (!request.body) {
            return NextResponse.json(
                { message: "Request body is required." },
                { status: 400 }
            );
        }

        // Parse and validate the incoming data
        const body = await request.json();
        const data = zTagSchema.parse(body);

        // Create new tag
        const tag = await createTag(data);

        // If creation failed for some reason
        if (!tag) {
            return NextResponse.json(
                { message: "Unable to create new tag." },
                { status: 400 }
            );
        }

        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        console.error("Error creating tag:", error);

        // Database connection error
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        // Handle duplicate tag error (e.g., unique constraint violation)
        if ((error as any).code === "P2002") {
            return NextResponse.json(
                { error: "Tag already exists." },
                { status: 409 }
            );
        }

        // Zod validation errors
        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid tag data.", details: (error as any).errors },
                { status: 400 }
            );
        }

        // Fallback server error
        return NextResponse.json(
            { error: "Failed to create tag due to server error." },
            { status: 500 }
        );
    }
}
