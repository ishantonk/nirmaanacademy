import { getAuthSession } from "@/lib/auth";
import {
    deleteNotice,
    getNoticeById,
    updateNotice,
    updateNoticeVisibility,
} from "@/lib/services/notice";
import { zNoticeSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: noticeId } = await context.params;

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
        const data = zNoticeSchema.parse(body);
        if (!data) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        // Check if the notice exists
        const existing = await getNoticeById(noticeId);
        if (!existing) {
            return NextResponse.json(
                { message: "Notice not found." },
                { status: 404 }
            );
        }

        const updated = await updateNotice(noticeId, data);
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update notice." },
                { status: 400 }
            );
        }

        // Return the updated notice
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on updating notice:", error);

        // Handle known specific error types here (e.g., database issues)
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 } // Service Unavailable
            );
        }

        // Handle validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors },
                { status: 400 } // Bad Request
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to update notice due to server error." },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from route params
        const { id: noticeId } = await context.params;

        // Auth
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        // Validate body
        const body = await request.json();
        const data = zNoticeSchema.partial().parse(body);
        if (!data) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        // Check existence
        const existing = await getNoticeById(noticeId);
        if (!existing) {
            return NextResponse.json(
                { message: "Notice not found." },
                { status: 404 }
            );
        }

        // Perform update
        const updated = await updateNoticeVisibility(
            noticeId,
            data.visible ?? existing.visible
        );
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update notice." },
                { status: 400 }
            );
        }

        // Return the updated notice
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on updating notice:", error);

        // DB connection errors
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Generic server error
        return NextResponse.json(
            { error: "Failed to update notice due to server error." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from route params
        const { id: noticeId } = await context.params;

        // Auth: only ADMIN allowed
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        // Check existence
        const existing = await getNoticeById(noticeId);
        if (!existing) {
            return NextResponse.json(
                { message: "Notice not found." },
                { status: 404 }
            );
        }

        // Perform delete
        const success = await deleteNotice(noticeId);
        if (!success) {
            return NextResponse.json(
                { message: "Failed to delete notice." },
                { status: 400 }
            );
        }

        // Return a success response
        return NextResponse.json(success, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on deleting notice:", error);

        // DB connection errors
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Generic server error
        return NextResponse.json(
            { error: "Failed to delete notice due to server error." },
            { status: 500 }
        );
    }
}
