import { NextRequest, NextResponse } from "next/server";
import {
    createAttempt,
    findAttemptBySlug,
    getAttempts,
} from "@/lib/services/attempt";
import { getAuthSession } from "@/lib/auth";
import { zAttemptSchema } from "@/lib/types";
import { slugify } from "@/lib/utils";

export async function GET() {
    try {
        const attempts = await getAttempts();
        return NextResponse.json(attempts, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching attempts:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to fetch attempts due to server error." },
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
        const data = zAttemptSchema.parse(body);

        // Set slug based on attempt name
        const slug = slugify(data.name);

        // Check if the slug already exists
        const existingAttempt = await findAttemptBySlug(slug);
        if (existingAttempt) {
            return NextResponse.json(
                { message: "Attempt with this slug already exists." },
                { status: 409 }
            );
        }

        // Creating new attempt
        const attempt = await createAttempt({ slug, ...data });
        if (!attempt) {
            return NextResponse.json(
                { message: "Unable to create new attempt." },
                { status: 400 }
            );
        }

        return NextResponse.json(attempt, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating attempt:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create attempt due to server error." },
            { status: 500 }
        );
    }
}
