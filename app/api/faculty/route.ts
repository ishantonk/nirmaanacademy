import { getFaculty } from "@/lib/faculty-service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const faculty = await getFaculty();

        if (!faculty) {
            return NextResponse.json(
                { error: "Faculty not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(faculty, { status: 200 });
    } catch (error) {
        console.error("Error fetching faculty:", error);
        return NextResponse.json(
            { error: "Failed to fetch faculty" },
            { status: 500 }
        );
    }
}
