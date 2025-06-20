import {
    Attempt,
    CartItem,
    Category,
    Course,
    Enrollment,
    Faculty,
    GallerySlide,
    GallerySlideType,
    Mode,
    Notice,
    Order,
    Post,
    Prisma,
    Review,
    Tag,
    User,
} from "@prisma/client";
import { z } from "zod";

export type SizeVariant = "sm" | "default" | "lg" | "xl";

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

export type NoticeType = Notice;

export type GalleryItemType = GallerySlide;

export type BlogPostType = Post & {
    author?: {
        name: string | null;
        email: string | null;
        bio: string | null;
        image: string | null;
    };
    category?: CategoryType;
    tags?: TagType[];
};

export type TagType = Tag & {
    _count?: {
        posts: number;
    };
};

export const zCourseSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: "Title must have at least 3 characters." }),
        description: z.string().optional(),
        thumbnail: z
            .string()
            .url({ message: "Thumbnail must be a valid URL." })
            .or(z.literal(""))
            .optional(),
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
    name: z
        .string()
        .min(3, { message: "Category name must be at least 3 characters." }),
    description: z.string().optional(),
});

export type AdminCategoriesFormValues = z.infer<typeof zCategoriesSchema>;

/**
 * Zod schema for faculty validation.
 * - name: required non-empty string.
 * - email: required valid email.
 * - phone: optional string.
 * - bio: optional string.
 * - image: optional string.
 * - designation: optional string.
 */
export const zFacultySchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    bio: z.string().optional(),
    image: z
        .string()
        .url({ message: "Image must be a valid URL." })
        .or(z.literal(""))
        .optional(),
    designation: z.string().optional(),
});

export type AdminFacultyFormValues = z.infer<typeof zFacultySchema>;

export const zAttemptSchema = z.object({
    name: z.string().min(3, "Attempt name must have at least 3 characters"),
});

export type AdminAttemptFormValues = z.infer<typeof zAttemptSchema>;

export const zModeSchema = z.object({
    name: z.string().min(3, "Mode name must have at least 3 characters"),
});

export type AdminModeFormValues = z.infer<typeof zModeSchema>;

export const zNoticeSchema = z.object({
    content: z.string().max(300, "Content must be at most 300 characters"),
    visible: z.boolean().optional(),
});

export type AdminNoticeFormValues = z.infer<typeof zNoticeSchema>;

export const zGallerySchema = z
    .object({
        title: z.string().max(100).optional(),
        subtitle: z.string().max(200).optional(),
        type: z.nativeEnum(GallerySlideType),
        imageUrl: z
            .string()
            .url({ message: "Image must be a valid URL." })
            .or(z.literal(""))
            .optional(),
        videoUrl: z
            .string()
            .url({ message: "Video must be a valid URL." })
            .or(z.literal(""))
            .optional(),
        sortOrder: z.number().int().nonnegative().default(0),
        visible: z.boolean().optional().default(true),
    })
    .refine(
        (data) =>
            (data.type === GallerySlideType.IMAGE &&
                !!data.imageUrl &&
                !data.videoUrl) ||
            (data.type === GallerySlideType.VIDEO &&
                !!data.videoUrl &&
                !data.imageUrl),
        {
            message:
                "When type is IMAGE you must provide imageUrl (and not videoUrl), and vice versa for VIDEO.",
            path: ["imageUrl", "videoUrl"],
        }
    );

export type AdminGalleryFormValues = z.infer<typeof zGallerySchema>;

export const zBlogSchema = z
    .object({
        title: z
            .string()
            .min(3, { message: "Title must have at least 3 characters." }),
        excerpt: z.string().max(300).optional(),
        content: z
            .string()
            .min(10, { message: "Content must have at least 10 characters." }),
        featuredImage: z
            .string()
            .url({ message: "Featured Image must be a valid URL." })
            .or(z.literal(""))
            .optional(),
        featuredImageAlt: z.string().optional(),
        status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
        publishedAt: z
            .preprocess(
                (val) => (typeof val === "string" ? new Date(val) : val),
                z.date()
            )
            .optional(),
        metaTitle: z.string().max(60).optional(),
        metaDescription: z.string().max(160).optional(),
        categoryId: z.string().min(1, { message: "Please select a category." }),
        tags: z.array(z.string()).optional(),
    })
    .refine(
        (data) =>
            data.status === "DRAFT" ||
            (data.status === "PUBLISHED" && !!data.publishedAt),
        {
            message: "Publish date is required when status is PUBLISHED.",
            path: ["publishedAt"],
        }
    );

export type AdminBlogFormValues = z.infer<typeof zBlogSchema>;

export const zTagSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Tag name must have at least 3 characters." }),
});

export type AdminTagFormValues = z.infer<typeof zTagSchema>;
