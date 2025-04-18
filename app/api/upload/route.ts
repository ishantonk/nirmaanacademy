import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getAuthSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { formatDate } from "@/lib/format";

export async function POST(request: NextRequest) {
    try {
        // Retrieve the current session to authenticate the user
        const session = await getAuthSession();

        // If there is no active session, return an unauthorized response
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse form data and extract the file
        const formData = await request.formData();
        const file = formData.get("file") as File;

        // Validate that a file is actually uploaded
        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type (allow only image types)
        const fileType = file.type;
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ];
        if (!validTypes.includes(fileType)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: jpeg, png, webp, gif" },
                { status: 422 }
            );
        }

        // Limit file size (max 10MB)
        const MAX_FILE_SIZE_MB = 10;
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return NextResponse.json(
                { error: `File too large. Max size is ${MAX_FILE_SIZE_MB}MB` },
                { status: 413 }
            );
        }

        // Optional: Enforce file name length
        if (file.name.length > 100) {
            return NextResponse.json(
                { error: "File name too long. Must be under 100 characters." },
                { status: 400 }
            );
        }

        // Optional: Validate file extension (basic level)
        const extension = file.name.split(".").pop()?.toLowerCase();
        const validExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
        if (!extension || !validExtensions.includes(extension)) {
            return NextResponse.json(
                { error: "Invalid file extension" },
                { status: 422 }
            );
        }

        // Generate a unique file name using slug, username, and timestamp
        const userName = session.user.name ?? "anonymous";
        const timestamp = formatDate(new Date(Date.now()));
        const fileName = `${slugify(file.name)}-${slugify(
            userName
        )}-${timestamp}.${extension}`;

        // Upload file to Vercel Blob storage
        const blob = await put(fileName, file, {
            access: "public",
            contentType: file.type,
        });

        if (!blob) {
            return NextResponse.json(
                { error: "Failed to upload image to Vercel Blob" },
                { status: 503 }
            );
        }

        // Return success response with public URL
        return NextResponse.json(
            {
                url: blob.url,
                success: true,
            },
            { status: 201 }
        );
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error uploading file:", error);

        // Handle specific known errors (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Vercel Blob service is not reachable." },
                { status: 503 }
            );
        }

        // Return a generic internal server error response
        return NextResponse.json(
            { error: "Failed to upload your image file." },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
