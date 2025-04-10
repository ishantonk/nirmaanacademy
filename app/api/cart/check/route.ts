import { getAuthSession } from "@/lib/auth";
import { checkCourseInCart } from "@/lib/cart-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getAuthSession();
        const searchParams = request.nextUrl.searchParams;

        const courseId = searchParams.get("courseId");

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        } else if (!courseId) {
            return NextResponse.json(
                { message: "Course ID is required" },
                { status: 400 }
            );
        } else {
            const userId = session.user.id;
            const isInCart = await checkCourseInCart({ courseId, userId });

            if (isInCart) return NextResponse.json(isInCart, { status: 200 });
        }

        return NextResponse.json(
            { message: "Course not found in cart" },
            { status: 404 }
        );
    } catch {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
