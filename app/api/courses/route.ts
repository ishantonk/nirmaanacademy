import { getCourses } from "@/lib/course-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");

    try {
        const courses = await getCourses(category, search, price, sort);

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}
