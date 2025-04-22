import {
    Attempt,
    CartItem,
    Category,
    Course,
    Enrollment,
    Faculty,
    Mode,
    Order,
    Post,
    Prisma,
    Review,
    Tag,
    User,
} from "@prisma/client";
import { z } from "zod";

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
    modeId: string | null;
    attemptId: string | null;
    course?: CourseType;
};

export type CourseType = Course & {
    category?: {
        name: string;
    };
    enrollments?: Array<EnrollmentType>;
    availableModes: Array<ModeType>;
    availableAttempts: Array<AttemptType>;
    faculties?: Array<FacultyType>;
    reviews?: Array<ReviewType>;
    cartItems?: Array<{
        id: string;
        userId: string;
        courseId: string;
    }>;
};

export type OrderType = Order;

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

export const zCourseSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: "Title must have at least 3 characters." }),
        description: z.string().optional(),
        thumbnail: z.string().optional(),
        price: z.coerce.number().min(1, { message: "Price must be positive" }),
        discountPrice: z.coerce
            .number()
            .min(1, { message: "Discount must be positive" })
            .optional(),
        onSale: z.boolean().default(false),
        durationInMin: z.coerce
            .number()
            .min(1, { message: "Duration must be positive" }),
        featured: z.boolean().default(false),
        videoLanguage: z.string().optional(),
        courseMaterialLanguage: z.string().optional(),
        demoVideoUrl: z.string().optional(),
        categoryId: z.string().min(1, { message: "Please select a category" }),
        facultyIds: z
            .array(z.string())
            .min(1, { message: "Select at least one faculty" }),
        modeIds: z
            .array(z.string())
            .min(1, { message: "Select at least one mode" }),
        attemptIds: z
            .array(z.string())
            .min(1, { message: "Select at least one attempt" }),
    })
    .refine(
        (data) =>
            !data.onSale || (data.onSale && data.discountPrice !== undefined),
        {
            message: "Discount price is required when the course is on sale.",
            path: ["discountPrice"],
        }
    );

export type AdminCourseFormValues = z.infer<typeof zCourseSchema>;

export const zCourseStatusUpdateSchema = z.object({
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    featured: z.boolean().optional(),
});

export type CourseStatusUpdateValues = z.infer<
    typeof zCourseStatusUpdateSchema
>;

/**
 * Zod schema for category validation.
 * - name: required non-empty string.
 * - description: required valid description.
 */
export const zCategoriesSchema = z.object({
    name: z.string().min(3, { message: "Category name must be at least 3 characters." }),
    description: z.string().optional(),
});

export type AdminCategoriesFormValues = z.infer<typeof zCategoriesSchema>;
