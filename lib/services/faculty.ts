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

export async function findFacultyById({
    id,
}: {
    id: string;
}): Promise<FacultyType | null> {
    try {
        const faculty = await prisma.faculty.findUnique({
            where: {
                id: id,
            },
        });
        return faculty;
    } catch (error) {
        console.error("Error on finding faculty by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findFacultyByEmail({
    email,
}: {
    email: string;
}): Promise<FacultyType | null> {
    try {
        const faculty = await prisma.faculty.findUnique({
            where: {
                email: email,
            },
        });
        return faculty;
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

export async function createFaculty({
    name,
    email,
    phone,
    bio,
    image,
    designation,
}: CreateFacultyProps): Promise<FacultyType> {
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

interface UpdateFacultyProps extends CreateFacultyProps {
    id: string;
}
export async function updateFaculty({
    id,
    name,
    email,
    phone,
    bio,
    image,
    designation,
}: UpdateFacultyProps): Promise<FacultyType> {
    try {
        return await prisma.faculty.update({
            where: {
                id: id,
            },
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
        console.error("Error on updating faculty by this data:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface RemoveFacultyProps {
    id: string;
}
export async function removeFaculty({
    id,
}: RemoveFacultyProps): Promise<FacultyType> {
    try {
        return await prisma.faculty.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error("Error on deleting faculty by this ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
