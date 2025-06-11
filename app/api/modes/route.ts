import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { createMode, findModeBySlug } from "@/lib/services/mode";
import { zModeSchema } from "@/lib/types";
import { getModes } from "@/lib/services/mode";
import { slugify } from "@/lib/utils";

export async function GET() {
    try {
        const modes = await getModes();
        return NextResponse.json(modes, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching modes:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to fetch modes due to server error." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Validate session
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate request body
        if (!request.body) {
            return NextResponse.json(
                { message: "Request body is required" },
                { status: 400 }
            );
        }

        // Parse the request body
        const body = await request.json();
        const data = zModeSchema.parse(body);

        // Set slug based on mode name
        const slug = slugify(data.name);

        // Check if the slug already exists
        const existingMode = await findModeBySlug(slug);
        if (existingMode) {
            return NextResponse.json(
                { message: "Mode with this slug already exists." },
                { status: 409 }
            );
        }

        // Creating new mode
        const mode = await createMode({ slug, ...data });
        if (!mode) {
            return NextResponse.json(
                { message: "Unable to create new mode." },
                { status: 400 }
            );
        }

        return NextResponse.json(mode, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating mode:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create mode due to server error." },
            { status: 500 }
        );
    }
}
