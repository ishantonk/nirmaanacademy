import { NextResponse } from "next/server";
import { getFaculty } from "@/lib/services/faculty";

// GET API endpoint to retrieve faculty data
export async function GET() {
    try {
        // Fetch faculty data from the service
        const faculty = await getFaculty();

        // Check if the result is undefined or null
        if (!faculty) {
            return NextResponse.json(
                { error: "Faculty not found." },
                { status: 404 }
            );
        }

        // Check if the data is empty (e.g., an empty array)
        if (Array.isArray(faculty) && faculty.length === 0) {
            return NextResponse.json(
                { message: "No faculty records available." },
                { status: 204 } // No Content
            );
        }

        // Return the fetched faculty data with a success status
        return NextResponse.json(faculty, { status: 200 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error fetching faculty:", error);

        // Handle specific known errors (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic internal server error response
        return NextResponse.json(
            { error: "Failed to fetch faculty due to server error." },
            { status: 500 }
        );
    }
}
