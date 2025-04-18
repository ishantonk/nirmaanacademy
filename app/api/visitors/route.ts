import { NextResponse } from "next/server";
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

export async function POST() {
    try {
        let userName = "Anonymous";

        // Check for user session
        const session = await getAuthSession();
        if (session) {
            userName = session.user.name!;
        }

        await registerVisitor({ user: userName });
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
