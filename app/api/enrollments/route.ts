import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getEnrollments } from "@/lib/services/enrollment";

// GET API endpoint to retrieve the current user's enrollments.
export async function GET() {
    try {
        // Get the current user session to ensure the user is authenticated
        const session = await getAuthSession();

        // If there's no session, the user is not logged in
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized. Please log in to view enrollments." },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Fetch the user's enrollments based on their user ID
        const enrollments = await getEnrollments(userId);

        // Check if the enrollment result is null or undefined
        if (!enrollments) {
            return NextResponse.json(
                { error: "Enrollments not found." },
                { status: 404 }
            );
        }

        // Handle the case where the enrollments array is empty
        if (Array.isArray(enrollments) && enrollments.length === 0) {
            return NextResponse.json(
                { message: "You have no current enrollments." },
                { status: 204 } // No Content
            );
        }

        // If everything is fine, return the enrollment data
        return NextResponse.json(enrollments, { status: 200 });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching enrollments:", error);

        // Handle known specific error types here (e.g., database issues)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection failed." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic server error if something else goes wrong
        return NextResponse.json(
            { error: "Failed to fetch enrollments due to a server error." },
            { status: 500 }
        );
    }
}
