import { getAuthSession } from "@/lib/auth";
import {
    findAttemptById,
    findAttemptBySlug,
    removeAttempt,
    updateAttempt,
} from "@/lib/services/attempt";
import { zAttemptSchema } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Update Attempt
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: attemptId } = await context.params;

        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const data = zAttemptSchema.parse(body);

        const slug = slugify(data.name);

        const existing = await findAttemptBySlug(slug);
        if (existing && existing.id !== attemptId) {
            return NextResponse.json(
                {
                    message:
                        "A Attempt with this name already exists. Please choose a different name.",
                },
                { status: 409 }
            );
        }

        const updated = await updateAttempt({ id: attemptId, slug, ...data });
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update the attempt." },
                { status: 400 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating attempt:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error while updating attempt." },
            { status: 500 }
        );
    }
}

// Delete Attempt
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: attemptId } = await context.params;

        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const existing = await findAttemptById(attemptId);
        if (!existing) {
            return NextResponse.json(
                { message: "Attempt not found." },
                { status: 404 }
            );
        }

        const deletedAttempt = await removeAttempt(attemptId);
        if (!deletedAttempt) {
            return NextResponse.json(
                { message: "Failed to delete the attempt." },
                { status: 400 }
            );
        }

        return NextResponse.json(deletedAttempt, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting attempt:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error while deleting attempt." },
            { status: 500 }
        );
    }
}
