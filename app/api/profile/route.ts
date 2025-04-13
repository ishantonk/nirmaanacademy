import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getProfile } from "@/lib/services/profile";

// GET API endpoint to fetch the current user's profile
export async function GET() {
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

        // Fetch the profile using the authenticated user's ID
        const profile = await getProfile(session.user.id);

        // If profile not found, return a custom error response
        if (!profile) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }

        // Return the profile data with a success status
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error fetching profile:", error);

        // Handle specific known errors (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic internal server error response
        return NextResponse.json(
            { error: "Failed to fetch profile details." },
            { status: 500 }
        );
    }
}

// todo: add put request for updating profile.
