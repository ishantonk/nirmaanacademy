import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const modes = await prisma.mode.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(modes);
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching modes:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return generic server error
        return NextResponse.json(
            { error: "Failed to fetch modes due to server error." },
            { status: 500 }
        );
    }
}
