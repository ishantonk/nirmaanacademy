import {
    AdminCategoriesFormValues,
    AdminCourseFormValues,
    AttemptType,
    BlogPostType,
    CartItemType,
    CategoryType,
    CourseStatusUpdateValues,
    CourseType,
    EnrollmentType,
    FacultyType,
    ModeType,
    UserType,
} from "@/lib/types";
import { safeFetch } from "@/lib/utils";

const BASE = process.env.NEXT_PUBLIC_DOMAIN;

// Blogs
export async function fetchBlogs(): Promise<BlogPostType[]> {
    return safeFetch<BlogPostType[]>(
        `${BASE}/api/blogs`,
        { method: "GET" },
        "Failed to fetch blogs"
    );
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs/${encodeURIComponent(slug)}`,
        { method: "GET" },
        `Failed to fetch blog "${slug}"`
    );
}

// Cart
export async function fetchCart(): Promise<CartItemType[]> {
    return safeFetch<CartItemType[]>(
        `${BASE}/api/cart`,
        { method: "GET" },
        "Failed to fetch cart",
        true
    );
}

export async function fetchFindInCart(
    courseId: string
): Promise<CartItemType | null> {
    try {
        return await safeFetch<CartItemType>(
            `${BASE}/api/cart?courseId=${courseId}`,
            { method: "GET" },
            "Failed to find cart item",
            true
        );
    } catch (error) {
        if (
            error instanceof Error &&
            (error.message.includes("404") || error.message.includes("401"))
        )
            return null;

        throw error;
    }
}

export async function addCartItem(data: {
    courseId: string;
    attemptId: string;
    modeId: string;
}): Promise<CartItemType> {
    return safeFetch<CartItemType>(
        `${BASE}/api/cart`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to add cart item",
        true
    );
}

export async function removeCartItem({
    itemId,
}: {
    itemId: string;
}): Promise<CartItemType> {
    return safeFetch<CartItemType>(
        `${BASE}/api/cart/${itemId}`,
        { method: "DELETE" },
        "Failed to remove cart item",
        true
    );
}

// Categories
export async function fetchCategories(count?: number): Promise<CategoryType[]> {
    const url = count
        ? `${BASE}/api/categories?count=${count}`
        : `${BASE}/api/categories`;

    return safeFetch<CategoryType[]>(
        url,
        { method: "GET" },
        "Failed to fetch categories"
    );
}

export async function createCategory(
    data: AdminCategoriesFormValues
): Promise<CategoryType> {
    return safeFetch(
        `${BASE}/api/categories`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create category",
        true
    );
}

// Checkout
export async function checkoutSession(): Promise<{ sessionId: string }> {
    return safeFetch<{ sessionId: string }>(
        `${BASE}/api/checkout/session`,
        { method: "POST" },
        "Failed to create checkout session",
        true
    );
}

// Courses
export async function fetchCourses(query?: string): Promise<CourseType[]> {
    return safeFetch<CourseType[]>(
        `${BASE}/api/courses/${query ? `?${query}` : ""}`,
        { method: "GET" },
        "Failed to fetch courses"
    );
}

export async function fetchAdminCourses(): Promise<CourseType[]> {
    return safeFetch<CourseType[]>(
        `${BASE}/api/courses/admin`,
        { method: "GET" },
        "Failed to fetch admin courses",
        true
    );
}

export async function fetchCourseBySlug(slug: string): Promise<CourseType> {
    return safeFetch<CourseType>(
        `${BASE}/api/courses/${encodeURIComponent(slug)}`,
        { method: "GET" },
        "Failed to fetch admin courses"
    );
}

export async function createCourse(
    data: AdminCourseFormValues
): Promise<CourseType> {
    return safeFetch<CourseType>(
        `${BASE}/api/courses`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        `Failed to create course "${data.title}"`,
        true
    );
}

export async function updateCourse(
    slug: string,
    data: AdminCourseFormValues
): Promise<CourseType> {
    return safeFetch<CourseType>(
        `${BASE}/api/courses/${slug}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update course",
        true
    );
}

export async function updateCourseStatus(
    slug: string,
    data: CourseStatusUpdateValues
): Promise<CourseType> {
    return safeFetch<CourseType>(
        `${BASE}/api/courses/${slug}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update course status",
        true
    );
}

export async function removeCourse(slug: string): Promise<CourseType> {
    return safeFetch<CourseType>(
        `${BASE}/api/courses/${slug}`,
        { method: "DELETE" },
        "Failed to delete course",
        true
    );
}

// Enrollments
export async function fetchEnrollments(): Promise<EnrollmentType[]> {
    return safeFetch<EnrollmentType[]>(
        `${BASE}/api/enrollments`,
        { method: "GET" },
        "Failed to fetch Enrollments",
        true
    );
}

// Faculty
export async function fetchFaculties(): Promise<FacultyType[]> {
    return safeFetch<FacultyType[]>(
        `${BASE}/api/faculty`,
        { method: "GET" },
        "Failed to fetch faculties"
    );
}

export async function createFaculty(
    data: Partial<FacultyType>
): Promise<FacultyType> {
    return safeFetch<FacultyType>(
        `${BASE}/api/faculty`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create faculty",
        true
    );
}

export async function updateFaculty(
    data: Partial<FacultyType>
): Promise<FacultyType> {
    return safeFetch<FacultyType>(
        `${BASE}/api/faculty`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update faculty",
        true
    );
}

export async function removeFaculty(id: string): Promise<FacultyType> {
    return safeFetch<FacultyType>(
        `${BASE}/api/faculty?facultyId=${id}`,
        { method: "DELETE" },
        "Failed to delete faculty",
        true
    );
}

// Modes
export async function fetchModes(): Promise<ModeType[]> {
    return safeFetch<ModeType[]>(
        `${BASE}/api/modes`,
        { method: "GET" },
        "Failed to fetch modes"
    );
}

// Attempts
export async function fetchAttempts(): Promise<AttemptType[]> {
    return safeFetch<AttemptType[]>(
        `${BASE}/api/attempts`,
        { method: "GET" },
        "Failed to fetch attempts"
    );
}

// Profile
export async function fetchUserProfile(): Promise<UserType> {
    return safeFetch<UserType>(
        `${BASE}/api/profile`,
        { method: "GET" },
        "Failed to fetch profile",
        true
    );
}

export async function updateUserProfile(
    data: Partial<UserType>
): Promise<UserType> {
    return safeFetch<UserType>(
        `${BASE}/api/profile`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update profile",
        true
    );
}

// Upload
export async function uploadToBlob(
    file: File
): Promise<{ url: string; success: boolean }> {
    const form = new FormData();
    form.append("file", file);

    return safeFetch<{ url: string; success: boolean }>(
        `${BASE}/api/upload`,
        {
            method: "POST",
            body: form,
        },
        "Failed to upload file",
        true
    );
}

// Visitors
export async function fetchVisitors(): Promise<number> {
    const data = await safeFetch<{ count: number }>(
        `${BASE}/api/visitors`,
        { method: "POST" },
        "Failed to track visitor",
        true
    );
    return data.count;
}

export async function registerVisitor(): Promise<number> {
    const data = await safeFetch<{ count: number }>(
        `${BASE}/api/visitors`,
        { method: "GET" },
        "Failed to track visitor",
        true
    );
    return data.count;
}
