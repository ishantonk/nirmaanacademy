import { prisma } from "@/lib/prisma";
import { AdminTagFormValues, TagType } from "@/lib/types";
import { slugify } from "@/lib/utils";

export async function getTags(): Promise<TagType[]> {
    try {
        return await prisma.tag.findMany({
            orderBy: {
                name: "asc",
            },
        });
    } catch (error) {
        console.error("Error on fetching tags:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getTagById(id: string): Promise<TagType | null> {
    try {
        return await prisma.tag.findUnique({
            where: { id: id },
        });
    } catch (error) {
        console.error("Error on fetching tag by ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function createTag(data : AdminTagFormValues): Promise<TagType> {
    try {
        return await prisma.tag.create({
            data: {
                name: data.name,
                slug: slugify(data.name),
            },
        });
    } catch (error) {
        console.error("Error on creating tag:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function updateTag(
    id: string,
    data: AdminTagFormValues
): Promise<TagType> {
    try {
        return await prisma.tag.update({
            where: { id: id },
            data: {
                name: data.name,
                slug: slugify(data.name),
            },
        });
    } catch (error) {
        console.error("Error on updating tag:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function deleteTag(id: string): Promise<TagType> {
    try {
        return await prisma.tag.delete({
            where: { id: id },
        });
    } catch (error) {
        console.error("Error on deleting tag:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getTagBySlug(slug: string): Promise<TagType | null> {
    try {
        return await prisma.tag.findUnique({
            where: { slug: slug },
        });
    } catch (error) {
        console.error("Error on fetching tag by slug:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}