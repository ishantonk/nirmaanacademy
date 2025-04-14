import { NextResponse } from "next/server";

// TEMP: In-memory counter (reset on server restart)
// You should use a DB like Redis, PostgreSQL, etc.
let visitors = 0;

export async function GET() {
    return NextResponse.json({ count: visitors });
}

export async function POST() {
    visitors += 1;
    return NextResponse.json({ count: visitors });
}
