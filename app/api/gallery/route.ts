import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import {
    createGallerySlide,
    getAllGallerySlides,
    getVisibleGallerySlides,
} from "@/lib/services/gallery";
import { zGallerySchema } from "@/lib/types";

export async function GET() {
    try {
        const session = await getAuthSession();

        if (session) {
            // Admin sees all slides
            if (session.user.role === "ADMIN") {
                const slides = await getAllGallerySlides();
                if (!slides || slides.length === 0) {
                    return NextResponse.json(
                        { message: "No slides found" },
                        { status: 404 }
                    );
                }
                return NextResponse.json(slides, { status: 200 });
            }

            // Non-admin logged in
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Unauthenticated: only visible slides
        const slides = await getVisibleGallerySlides();
        if (!slides || slides.length === 0) {
            return NextResponse.json(
                { message: "No slides found" },
                { status: 404 }
            );
        }
        return NextResponse.json(slides, { status: 200 });
    } catch (error) {
        console.error("Error fetching gallery slides:", error);
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }
        return NextResponse.json(
            { error: "Failed to fetch gallery slides due to server error." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getAuthSession();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const data = zGallerySchema.parse(body);

        // Create new slide
        const slide = await createGallerySlide(data);
        if (!slide) {
            return NextResponse.json(
                { message: "Unable to create gallery slide." },
                { status: 400 }
            );
        }
        return NextResponse.json(slide, { status: 201 });
    } catch (error) {
        console.error("Error creating gallery slide:", error);
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create gallery slide due to server error." },
            { status: 500 }
        );
    }
}
