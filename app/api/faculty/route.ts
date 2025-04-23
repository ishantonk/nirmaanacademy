import { NextRequest, NextResponse } from "next/server";
import {
    createFaculty,
    findFacultyByEmail,
    getFaculty,
} from "@/lib/services/faculty";
import { getAuthSession } from "@/lib/auth";
import { zFacultySchema } from "@/lib/types";

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
            return NextResponse.json([], { status: 200 }); // No faculty records available.
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

export async function POST(request: NextRequest) {
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

        // Validate request body
        const body = await request.json();
        const { name, email, phone, bio, image, designation } =
            zFacultySchema.parse(body);

        // Checking for admin user.
        if (userRole !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Find if same faculty exist already.
        const existingFaculty = await findFacultyByEmail({ email: email });
        if (existingFaculty) {
            return NextResponse.json(
                { message: "Faculty email is already exist." },
                { status: 400 }
            );
        }

        // Creating new faculty.
        const faculty = await createFaculty({
            name: name,
            email: email,
            phone: phone,
            bio: bio,
            image: image,
            designation: designation,
        });
        if (!faculty) {
            return NextResponse.json(
                { message: "Unable to creating new faculty." },
                { status: 400 }
            );
        }

        return NextResponse.json(faculty, { status: 201 });
    } catch (error) {
        // Log detailed error to the console for debugging purposes
        console.error("Error on creating new faculty:", error);

        // Handle specific known errors (e.g., DB connection issue)
        if ((error as { code?: string }).code === "ECONNREFUSED") {
            return NextResponse.json(
                { error: "Database connection refused." },
                { status: 503 } // Service Unavailable
            );
        }

        // Return a generic internal server error response
        return NextResponse.json(
            { error: "Failed on creating faculty due to server error." },
            { status: 500 }
        );
    }
}
