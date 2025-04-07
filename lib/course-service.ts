import { prisma } from "@/lib/prisma";
import { CourseType, CourseWhereType } from "@/lib/types";

// Get all courses with optional filters and sorting
export async function getCourses(
    category?: string | null,
    search?: string | null,
    price?: string | null,
    sort?: string | null
): Promise<CourseType[]> {
    // Build the where clause for filtering
    const where: CourseWhereType = {
        status: "PUBLISHED",
    };

    // Category filter
    if (category) {
        where.category = {
            slug: category,
        };
    }

    // Search filter
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    // Price filter
    if (price === "free") {
        where.price = 0;
    } else if (price === "paid") {
        where.price = {
            gt: 0,
        };
    }

    // Determine sort order
    let orderBy: { [key: string]: "asc" | "desc" } = { createdAt: "desc" };

    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "title-asc") orderBy = { title: "asc" };
    else if (sort === "title-desc") orderBy = { title: "desc" };

    // Fetch courses from the database
    const courses = await prisma.course.findMany({
        where,
        include: {
            category: true,
            faculties: true,
        },
        orderBy,
    });

    return courses
}

// Get course by slug
export async function getCourseBySlug(
    slug: string
): Promise<CourseType | null> {
    return await prisma.course.findUnique({
        where: {
            slug,
            status: "PUBLISHED",
        },
        include: {
            category: true,
            faculties: true,
            enrollments: true,
            availableModes: true,
            selectedMode: true,
            availableAttempts: true,
            selectedAttempt: true,
            cartItems: {
                select: {
                    id: true,
                    userId: true,
                    courseId: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                    updatedAt: true,
                    userId: true,
                    courseId: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
}
