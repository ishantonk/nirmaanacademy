import { FacultyType } from "@/lib/types";
import { prisma } from "@/lib/prisma";

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
