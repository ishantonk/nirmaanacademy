import {
    Attempt,
    CartItem,
    Category,
    Course,
    Enrollment,
    Faculty,
    Mode,
    Post,
    Prisma,
    Review,
} from "@prisma/client";

export type CourseWhereType = Prisma.CourseWhereInput & {
    status: string;
    category?: { slug: string };
    OR?: Array<{
        title?: { contains: string; mode: string };
        description?: { contains: string; mode: string };
    }>;
    price?: number | { gt: number };
};

export type CategoryType = Category;

export type FacultyType = Faculty & {
    name: string;
    image: string | null;
    bio: string | null;
    email: string | null;
    phone: string | null;
    designation: string | null;
};

export type ModeType = Mode & {
    id: string;
    name: string;
    slug: string;
};

export type AttemptType = Attempt & {
    id: string;
    name: string;
    slug: string;
};

export type EnrollmentType = Enrollment & {
    id: string;
    userId: string;
    courseId: string;
};

export type ReviewType = Review & {
    id: string;
    rating: number | null;
    comment: string | null;
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
    createdAt: Date;
};

export type cartItem = CartItem & {
    id: string;
    userId: string;
    courseId: string;
}

export type CourseType = Course & {
    category?: {
        name: string;
    };
    enrollments?: Array<EnrollmentType>;
    selectedMode?: ModeType;
    availableModes?: Array<ModeType>;
    selectedAttempt?: AttemptType;
    availableAttempts?: Array<AttemptType>;
    faculties?: Array<FacultyType>;
    reviews?: Array<ReviewType>;
    cartItems?: Array<cartItem>;
};

export type BlogPostType = Post & {
    author?: {
        name: string | null;
        bio: string | null;
        image: string | null;
    };
    category?: {
        name: string | null;
        slug: string | null;
        description: string | null;
    };
    tags?: Array<{
        id: string | null;
        name: string | null;
        slug: string | null;
    }>;
};
