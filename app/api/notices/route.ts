import { getAuthSession } from "@/lib/auth";
import { createNotice, getVisibleNotices } from "@/lib/services/notice";
import { zNoticeSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { getAllNotices } from "@/lib/services/notice";

export async function GET() {
    try {
        // Validate session
        const session = await getAuthSession();

        if (session) {
            if (session.user.role === "ADMIN") {
                // If the user is an admin, return all notices.
                const notices = await getAllNotices();
                if (!notices) {
                    return NextResponse.json(
                        { message: "No notices found" },
                        { status: 404 }
                    );
                }
                return NextResponse.json(notices, { status: 200 });
            } else {
                return NextResponse.json(
                    { message: "Unauthorized" },
                    { status: 401 }
                );
            }
        }

        // If no session, return visible notices.
        const notices = await getVisibleNotices();
        if (!notices) {
            return NextResponse.json(
                { message: "No notices found" },
                { status: 404 }
            );
        }
        return NextResponse.json(notices, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating notice:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to create notice due to server error." },
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
        const data = zNoticeSchema.parse(body);
        // Check if the request body contains valid data
        if (!data.content) {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        // Creating new notice.
        const notice = await createNotice({ ...data });
        if (!notice) {
            return NextResponse.json(
                { message: "Unable to creating new notice." },
                { status: 400 }
            );
        }

        return NextResponse.json(notice, { status: 201 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on creating notice:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to create notice due to server error." },
            { status: 500 }
        );
    }
}
