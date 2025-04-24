import { AdminNoticeFormValues, NoticeType } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export async function createNotice(
    data: AdminNoticeFormValues
): Promise<NoticeType> {
    try {
        if (data.visible === undefined) {
            data.visible = false; // Default to false if not provided
        }
        return await prisma.notice.create({
            data: {
                content: data.content,
                visible: data.visible,
            },
        });
    } catch (error) {
        console.error("Error on creating new notice:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function updateNotice(
    id: string,
    data: AdminNoticeFormValues
): Promise<NoticeType> {
    try {
        return await prisma.notice.update({
            where: { id: id },
            data: {
                content: data.content,
                visible: data.visible,
            },
        });
    } catch (error) {
        console.error("Error on updating notice:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function updateNoticeVisibility(
    id: string,
    visible: boolean
): Promise<NoticeType> {
    try {
        return await prisma.notice.update({
            where: { id: id },
            data: { visible: visible },
        });
    } catch (error) {
        console.error("Error on updating notice visibility:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function deleteNotice(id: string): Promise<NoticeType> {
    try {
        return await prisma.notice.delete({
            where: { id: id },
        });
    } catch (error) {
        console.error("Error on deleting notice:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getNoticeById(id: string): Promise<NoticeType | null> {
    try {
        return await prisma.notice.findUnique({
            where: { id: id },
        });
    } catch (error) {
        console.error("Error on fetching notice by ID:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getAllNotices(): Promise<NoticeType[]> {
    try {
        return await prisma.notice.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error on fetching all notices:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function getVisibleNotices(): Promise<NoticeType[]> {
    try {
        return await prisma.notice.findMany({
            where: { visible: true },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Error on fetching visible notices:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}
