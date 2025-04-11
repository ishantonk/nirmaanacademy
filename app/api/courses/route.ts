import { getCourseById, getCourses } from "@/lib/course-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const price = searchParams.get("price");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured") === "true";
    const count = Number(searchParams.get("count"));

    try {
        if (id) {
            const course = getCourseById(id);
            return NextResponse.json(course, { status: 200 });
        }
        const courses = await getCourses(
            category,
            search,
            price,
            sort,
            count,
            featured
        );

        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}
