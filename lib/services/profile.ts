import { prisma } from "@/lib/prisma";
import { UserType } from "@/lib/types";

export async function getProfile(userId: string): Promise<UserType | null> {
    const userProfile = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            accounts: {
                select: {
                    type: true,
                    provider: true,
                },
            },
        },
    });

    if (userProfile) {
        userProfile.password = null;
    }

    return userProfile;
}

// todo: create updateProfile function for updating profile details.
