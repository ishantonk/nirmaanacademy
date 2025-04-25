import { getAuthSession } from "@/lib/auth";
import {
    deleteGallerySlide,
    getGallerySlideById,
    updateGallerySlide,
    updateGallerySlideVisibility,
} from "@/lib/services/gallery";
import { zGallerySchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: galleryId } = await context.params;

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
        const data = zGallerySchema.parse(body);
        if (!data) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        // Check if the gallery exists
        const existing = await getGallerySlideById(galleryId);
        if (!existing) {
            return NextResponse.json(
                { message: "Gallery not found." },
                { status: 404 }
            );
        }

        const updated = await updateGallerySlide({ id: galleryId, ...data });
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update gallery." },
                { status: 400 }
            );
        }

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging
        console.error("Error on updating gallery:", error);

        // Handle specific error codes
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Failed to update gallery due to server error." },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        // Extract the id from dynamic route params
        const { id: galleryId } = await context.params;

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
        const baseSchema = zGallerySchema._def.schema; // Extract the base schema
        const data = baseSchema.partial().parse(body);

        // Check existence
        const existing = await getGallerySlideById(galleryId);
        if (!existing) {
            return NextResponse.json(
                { message: "Gallery not found." },
                { status: 404 }
            );
        }

        // Update visibility
        const updated = await updateGallerySlideVisibility(
            galleryId,
            data.visible ?? existing.visible
        );
        if (!updated) {
            return NextResponse.json(
                { message: "Failed to update gallery visibility." },
                { status: 400 }
            );
        }

        // Return the updated gallery
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        // Log the error for debugging
        console.error("Error on updating gallery visibility:", error);

        // Handle specific error codes
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Failed to update gallery due to server error." },
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
        const { id: galleryId } = await context.params;

        // Auth
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        // Check existence
        const existing = await getGallerySlideById(galleryId);
        if (!existing) {
            return NextResponse.json(
                { message: "Gallery not found." },
                { status: 404 }
            );
        }

        // Perform delete
        const success = await deleteGallerySlide(galleryId);
        if (!success) {
            return NextResponse.json(
                { message: "Failed to delete gallery." },
                { status: 400 }
            );
        }

        // Return success response
        return NextResponse.json(success, { status: 200 });
    } catch (error) {
        // Log the error for debugging
        console.error("Error on deleting gallery:", error);

        // Handle specific error codes
        const code = (error as { code?: string }).code;
        if (code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 }
            );
        }

        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }

        // Handle other errors
        return NextResponse.json(
            { error: "Failed to delete gallery due to server error." },
            { status: 500 }
        );
    }
}
