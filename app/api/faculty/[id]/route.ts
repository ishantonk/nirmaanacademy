import { NextRequest, NextResponse } from "next/server";
import { zFacultySchema } from "@/lib/types";
import { getAuthSession } from "@/lib/auth";
import {
    findFacultyById,
    updateFaculty,
    removeFaculty,
} from "@/lib/services/faculty";
import { z } from "zod";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: facultyId } = await context.params;

        // Check existence
        const existing = await findFacultyById({ id: facultyId });
        if (!existing) {
            return NextResponse.json(
                { message: "Faculty not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(existing, { status: 200 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error fetching faculty:", error);

        // Handle specific known errors (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Fallback for any other unexpected errors
        return NextResponse.json(
            { error: "Server error fetching faculty." },
            { status: 500 }
        );
    }
}

/**
 * Dynamic API route: /api/faculty/[id]
 * Handles PUT (update) and DELETE requests for a single faculty by ID.
 */
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: facultyId } = await context.params;

        // Auth
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate body
        const body = await request.json();
        const data = zFacultySchema.parse(body);

        // Check existence
        const existing = await findFacultyById({ id: facultyId });
        if (!existing) {
            return NextResponse.json(
                { message: "Faculty not found." },
                { status: 404 }
            );
        }

        // Make sure the faculty email not changed if changed then undo the changes
        // This is to prevent the email from being changed to an already existing email
        // Check if the email already exists in the database
        if (existing.email !== data.email) {
            data.email = existing.email;
        }

        // Perform update
        const updated = await updateFaculty({ id: facultyId, ...data });
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update faculty." },
                { status: 400 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error updating faculty:", error);

        // Handle specific known errors (e.g., DB connection issue)
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid data format." },
                { status: 422 }
            );
        }
        // Handle other errors
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Fallback for any other unexpected errors
        return NextResponse.json(
            { error: "Server error updating faculty." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: facultyId } = await context.params;

        // Auth
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Check existence
        const existing = await findFacultyById({ id: facultyId });
        if (!existing) {
            return NextResponse.json(
                { message: "Faculty not found." },
                { status: 404 }
            );
        }

        // Perform deletion
        const deleted = await removeFaculty({ id: facultyId });
        if (!deleted) {
            return NextResponse.json(
                { message: "Failed to delete faculty." },
                { status: 400 }
            );
        }

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error deleting faculty:", error);

        // Handle specific known errors (e.g., DB connection issue)
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Fallback for any other unexpected errors
        return NextResponse.json(
            { error: "Server error deleting faculty." },
            { status: 500 }
        );
    }
}
