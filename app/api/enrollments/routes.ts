import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getEnrollments } from "@/lib/enrollment-service";

export async function GET() {
    try {
        const session = await getAuthSession();

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        } else {
            const enrollments = await getEnrollments(session.user.id);

            if (!enrollments) {
                return NextResponse.json(
                    { error: "Enrollments not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(enrollments, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json(
            { error: "Failed to fetch enrollments" },
            { status: 500 }
        );
    }
}
