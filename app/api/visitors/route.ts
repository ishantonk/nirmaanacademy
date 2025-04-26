import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getVisitorCount, registerVisitor } from "@/lib/services/visitors";

export async function GET() {
    try {
        const visitorsCount = await getVisitorCount();
        return NextResponse.json({ count: visitorsCount }, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on get visit count:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to visitor count due to server error." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check for user session
        const session = await getAuthSession();
        const userName = session?.user?.name ?? "Anonymous";

        // Get the visitor's IP address
        const xForwardedFor = request.headers.get("x-forwarded-for");
        const visitorIp = xForwardedFor ? xForwardedFor.split(",")[0].trim() : "Unknown IP";

        // Register the visitor
        await registerVisitor({ user: userName, ip: visitorIp });
        const visitorsCount = await getVisitorCount();
        return NextResponse.json(visitorsCount, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error on registering your visit:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to register your visit due to server error." },
            { status: 500 }
        );
    }
}
