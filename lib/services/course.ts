import { prisma } from "@/lib/prisma";
import {
    AdminCourseFormValues,
    CourseStatusUpdateValues,
    CourseType,
    CourseWhereType,
} from "@/lib/types";

interface CourseSlugProps {
    slug: string;
}

interface CourseWithMultiProps {
    category?: string | null;
    search?: string | null;
    price?: string | null;
    sort?: string | null;
    count?: number | null;
    featured?: boolean;
}

// Get all courses with optional filters and sorting
export async function getCourses({
    category,
    search,
    price,
    sort,
    count,
    featured,
}: CourseWithMultiProps): Promise<CourseType[]> {
    // Build the where clause for filtering
    const where: CourseWhereType = {
        status: "PUBLISHED",
    };

    // For featured courses
    if (featured === true) {
        where.featured = featured;
    }

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

    if (count) {
        // Fetch number of count courses from the database
        const courses = await prisma.course.findMany({
            where,
            include: {
                category: true,
                faculties: true,
                cartItems: true,
                availableModes: true,
                availableAttempts: true,
            },
            take: count,
            orderBy,
        });
        return courses;
    }

    // Fetch all courses from the database
    const courses = await prisma.course.findMany({
        where,
        include: {
            category: true,
            faculties: true,
            cartItems: true,
            availableModes: true,
            availableAttempts: true,
        },
        orderBy,
    });
    return courses;
}

// Get course by id
export async function findCourseById(id: string): Promise<CourseType | null> {
    return await prisma.course.findUnique({
        where: {
            id: id,
            status: "PUBLISHED",
        },
        include: {
            category: true,
            availableAttempts: true,
            availableModes: true,
            faculties: true,
            cartItems: true,
        },
    });
}

// Get course by slug
export async function getCourseBySlug({
    slug,
}: CourseSlugProps): Promise<CourseType | null> {
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
            availableAttempts: true,
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

export async function getAllCourses() {
    try {
        return prisma.course.findMany({
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                availableModes: true,
                availableAttempts: true,
                faculties: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
    } catch (error) {
        console.error("Error getting all courses list:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

export async function findCourseBySlug({ slug }: CourseSlugProps) {
    try {
        return prisma.course.findUnique({
            where: {
                slug: slug,
            },
        });
    } catch (error) {
        console.error("Error on finding this course:", error);
        // Optionally, rethrow the error if you want the caller to handle it.
        throw error;
    }
}

interface CreateCourseProps {
    title: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    price: number;
    discountPrice?: number;
    onSale: boolean;
    durationInMin: number;
    featured: boolean;
    videoLanguage?: string;
    courseMaterialLanguage?: string;
    demoVideoUrl?: string;
    categoryId: string;
    modeIds: string[];
    attemptIds: string[];
    facultyIds: string[];
}

export async function createCourse({
    title,
    slug,
    description,
    thumbnail,
    price,
    discountPrice,
    onSale = false,
    durationInMin = 0,
    featured = false,
    videoLanguage = "English",
    courseMaterialLanguage = "English",
    demoVideoUrl,
    categoryId,
    modeIds,
    attemptIds,
    facultyIds,
}: CreateCourseProps): Promise<CourseType> {
    try {
        const course = await prisma.course.create({
            data: {
                title,
                slug,
                description,
                thumbnail,
                price,
                discountPrice,
                onSale,
                durationInMin,
                featured,
                videoLanguage,
                courseMaterialLanguage,
                demoVideoUrl,
                category: {
                    connect: { id: categoryId },
                },
                availableModes: {
                    connect: modeIds.map((id) => ({ id })),
                },
                availableAttempts: {
                    connect: attemptIds.map((id) => ({ id })),
                },
                faculties: {
                    connect: facultyIds.map((id) => ({ id })),
                },
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                availableModes: true,
                availableAttempts: true,
                faculties: true,
            },
        });
        return course;
    } catch (error) {
        console.error("Error creating course:", error);
        throw error;
    }
}

interface UpdateCourseProps extends AdminCourseFormValues {
    slug: string;
}

export async function updateCourse({
    slug,
    categoryId,
    modeIds,
    attemptIds,
    facultyIds,
    ...props
}: UpdateCourseProps): Promise<CourseType> {
    try {
        return await prisma.course.update({
            where: {
                slug: slug,
            },
            data: {
                ...props,
                category: { connect: { id: categoryId } },
                availableModes: {
                    set: modeIds.map((id) => ({ id })),
                },
                availableAttempts: {
                    set: attemptIds.map((id) => ({ id })),
                },
                faculties: {
                    set: facultyIds.map((id) => ({ id })),
                },
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                availableModes: true,
                availableAttempts: true,
                faculties: true,
            },
        });
    } catch (error) {
        console.error("Error updating course:", error);
        throw error;
    }
}

interface UpdateCourseStatusProps extends CourseStatusUpdateValues {
    slug: string;
}

export async function updateCourseStatus({
    slug,
    status,
    featured = false,
}: UpdateCourseStatusProps): Promise<CourseType> {
    try {
        return await prisma.course.update({
            where: {
                slug: slug,
            },
            data: {
                status: status,
                featured: featured,
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                availableModes: true,
                availableAttempts: true,
                faculties: true,
            },
        });
    } catch (error) {
        console.error("Error updating course status:", error);
        throw error;
    }
}

export async function deleteCourseBySlug(slug: string): Promise<CourseType> {
    try {
        return await prisma.course.delete({
            where: { slug: slug },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                availableModes: true,
                availableAttempts: true,
                faculties: true,
            },
        });
    } catch (error) {
        console.error("Error on removing course:", error);
        throw error;
    }
}
