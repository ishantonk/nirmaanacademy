import { prisma } from "@/lib/prisma";

export async function getVisitorCount() {
    return await prisma.visitor.count();
}

export async function registerVisitor({ user, ip }: { user: string, ip: string }) {
    // Check if the visitor already exists
    const existingVisitor = await prisma.visitor.findFirst({
        where: {
            user: user,
            ip: ip,
            visitAt: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of the day
                lt: new Date(new Date().setHours(23, 59, 59, 999)), // End of the day
            },
        },
    });
    if (existingVisitor) {
        // Visitor already exists for today
        return existingVisitor;
    }
    return await prisma.visitor.create({
        data: {
            user: user,
            ip: ip,
        },
    });
}
