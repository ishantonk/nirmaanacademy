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
    Tag,
    User,
} from "@prisma/client";

export type CourseWhereType = Prisma.CourseWhereInput & {
    status: string;
    count?: number;
    category?: { slug: string };
    OR?: Array<{
        title?: { contains: string; mode: string };
        description?: { contains: string; mode: string };
    }>;
    price?: number | { gt: number };
};

export type UserType = User & {
    account?: {
        type: string;
        provider: string;
    };
};

export type CategoryType = Category & {
    _count?: {
        courses: number;
    };
};

export type FacultyType = Faculty & {
    name: string;
    email: string | null;
    phone: string | null;
    bio: string | null;
    image: string | null;
    designation: string | null;
    _count?: {
        courses: number;
    };
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
    course?: CourseType;
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

export type CartItemType = CartItem & {
    id: string;
    userId: string;
    courseId: string;
    course?: CourseType;
};

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
    cartItems?: Array<{
        id: string;
        userId: string;
        courseId: string;
    }>;
};

export type BlogPostType = Post & {
    author?: {
        name: string | null;
        email: string | null;
        bio: string | null;
        image: string | null;
    };
    category?: CategoryType;
    tags?: Tag[];
};
