import { getAuthSession } from "@/lib/auth";
import { getAllCourses } from "@/lib/services/course";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Check for user session
        const session = await getAuthSession();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const userRole = session.user.role;

        // Checking for admin user.
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Getting all courses list.
        const courses = await getAllCourses();
        if (!courses) {
            return NextResponse.json(
                { message: "Unable to get courses list." },
                { status: 400 }
            );
        }

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        // Log unexpected server errors
        console.error("Error on getting course list:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        return NextResponse.json(
            { error: "Failed to getting courses due to a server error." },
            { status: 500 }
        );
    }
}
