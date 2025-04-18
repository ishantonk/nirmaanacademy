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

interface findFacultyByEmailProps {
    email: string;
}

export async function findFacultyByEmail({ email }: findFacultyByEmailProps) {
    try {
        return await prisma.faculty.findUnique({
            where: {
                email: email,
            },
        });
    } catch (error) {
        console.error("Error on finding faculty by this email:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface CreateFacultyProps {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    image?: string;
    designation?: string;
}

export async function CreateFaculty({
    name,
    email,
    phone,
    bio,
    image,
    designation,
}: CreateFacultyProps) {
    try {
        return await prisma.faculty.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                bio: bio,
                image: image,
                designation: designation,
            },
        });
    } catch (error) {
        console.error("Error on creating new faculty by this data:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
