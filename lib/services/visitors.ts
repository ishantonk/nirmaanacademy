import { prisma } from "@/lib/prisma";

export async function getVisitorCount() {
    return await prisma.visitor.count();
}

export async function registerVisitor({ user }: { user: string }) {
    return await prisma.visitor.create({
        data: {
            user: user,
        },
    });
}
