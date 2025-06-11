import { NextRequest, NextResponse } from "next/server";
import {
    findModeById,
    findModeBySlug,
    removeMode,
    updateMode,
} from "@/lib/services/mode";
import { getAuthSession } from "@/lib/auth";
import { zModeSchema } from "@/lib/types";
import { slugify } from "@/lib/utils";

// Update Mode
export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: modeId } = await context.params;

        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const data = zModeSchema.parse(body);

        const slug = slugify(data.name);

        const existing = await findModeBySlug(slug);
        if (existing && existing.id !== modeId) {
            return NextResponse.json(
                {
                    message:
                        "A mode with this name already exists. Please choose a different name.",
                },
                { status: 409 }
            );
        }

        const updated = await updateMode({ id: modeId, slug, ...data });
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update the mode." },
                { status: 400 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating mode:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error while updating mode." },
            { status: 500 }
        );
    }
}

// Delete Mode
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: modeId } = await context.params;

        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const existing = await findModeById(modeId);
        if (!existing) {
            return NextResponse.json(
                { message: "Mode not found." },
                { status: 404 }
            );
        }

        const deletedMode = await removeMode(modeId);
        if (!deletedMode) {
            return NextResponse.json(
                { message: "Failed to delete the mode." },
                { status: 400 }
            );
        }

        return NextResponse.json(deletedMode, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting mode:", error);

        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error while deleting mode." },
            { status: 500 }
        );
    }
}
