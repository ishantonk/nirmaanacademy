import { NextRequest, NextResponse } from "next/server";

import {
    getAllCategories,
    getCategoriesWithCount,
} from "@/lib/category-service";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const count = Number(searchParams.get("count"));

    try {
        if (count) {
            const categories = await getCategoriesWithCount(count);
            return NextResponse.json(categories, { status: 200 });
        }

        const categories = await getAllCategories();
        return NextResponse.json(categories, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
