import { GallerySlideType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminGalleryFormValues, GalleryItemType } from "@/lib/types";

export async function createGallerySlide(
    data: AdminGalleryFormValues
): Promise<GalleryItemType> {
    try {
        // Prisma default is visible = true, so only override if explicitly false
        const visible = data.visible === false ? false : true;

        return await prisma.gallerySlide.create({
            data: {
                title: data.title,
                subtitle: data.subtitle,
                type: data.type,
                // ensure the “other” field is set to null
                imageUrl:
                    data.type === GallerySlideType.IMAGE
                        ? data.imageUrl!
                        : null,
                videoUrl:
                    data.type === GallerySlideType.VIDEO
                        ? data.videoUrl!
                        : null,
                sortOrder: data.sortOrder,
                visible,
            },
        });
    } catch (error) {
        console.error("Error on creating new gallery slide:", error);
        throw error;
    }
}

export async function updateGallerySlide(
    data: { id: string } & AdminGalleryFormValues
): Promise<GalleryItemType> {
    try {
        return await prisma.gallerySlide.update({
            where: { id: data.id },
            data: {
                title: data.title,
                subtitle: data.subtitle,
                type: data.type,
                imageUrl:
                    data.type === GallerySlideType.IMAGE
                        ? data.imageUrl!
                        : null,
                videoUrl:
                    data.type === GallerySlideType.VIDEO
                        ? data.videoUrl!
                        : null,
                sortOrder: data.sortOrder,
                // again, default true unless explicitly false
                visible: data.visible === false ? false : true,
            },
        });
    } catch (error) {
        console.error("Error on updating gallery slide:", error);
        throw error;
    }
}

// for toggling visibility independently:
export async function updateGallerySlideVisibility(
    id: string,
    visible: boolean
): Promise<GalleryItemType> {
    try {
        return await prisma.gallerySlide.update({
            where: { id },
            data: { visible },
        });
    } catch (error) {
        console.error("Error on updating gallery slide visibility:", error);
        throw error;
    }
}

export async function deleteGallerySlide(id: string): Promise<GalleryItemType> {
    try {
        return await prisma.gallerySlide.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Error on deleting gallery slide:", error);
        throw error;
    }
}

export async function getGallerySlideById(
    id: string
): Promise<GalleryItemType | null> {
    try {
        return await prisma.gallerySlide.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error("Error on fetching gallery slide by ID:", error);
        throw error;
    }
}

export async function getAllGallerySlides(): Promise<GalleryItemType[]> {
    try {
        return await prisma.gallerySlide.findMany({
            orderBy: { sortOrder: "asc" },
        });
    } catch (error) {
        console.error("Error on fetching all gallery slides:", error);
        throw error;
    }
}

export async function getVisibleGallerySlides(): Promise<GalleryItemType[]> {
    try {
        return await prisma.gallerySlide.findMany({
            where: { visible: true },
            orderBy: { sortOrder: "asc" },
        });
    } catch (error) {
        console.error("Error on fetching visible gallery slides:", error);
        throw error;
    }
}
