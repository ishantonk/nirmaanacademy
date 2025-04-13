import { prisma } from "@/lib/prisma";
import { FacultyType } from "@/lib/types";

export async function getFaculty(): Promise<FacultyType[]> {
    return await prisma.faculty.findMany({
        include: {
            _count: {
                select: {
                    courses: true,
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
}

// todo: create a function for creating new faculty.
