import {
    AdminBlogFormValues,
    AdminCategoriesFormValues,
    AdminCourseFormValues,
    AdminGalleryFormValues,
    AdminNoticeFormValues,
    AttemptType,
    BlogPostType,
    CartItemType,
    CategoryType,
    CourseStatusUpdateValues,
    CourseType,
    EnrollmentType,
    FacultyType,
    GalleryItemType,
    ModeType,
    NoticeType,
    TagType,
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

export async function fetchAuthorBlogsAdmin(): Promise<BlogPostType[]> {
    return safeFetch<BlogPostType[]>(
        `${BASE}/api/blogs/author`,
        { method: "GET" },
        "Failed to fetch author blogs.",
        true
    );
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs/${encodeURIComponent(slug)}`,
        { method: "GET" },
        `Failed to fetch blog "${slug}"`
    );
}

export async function createBlog(
    data: AdminBlogFormValues
): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        `Failed to create blog "${data.title}"`,
        true
    );
}

export async function updateBlog(
    slug: string,
    data: AdminBlogFormValues
): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs/${slug}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        `Failed to update blog "${data.title}"`,
        true
    );
}

export async function updateBlogStatus(
    slug: string,
    data: { status: AdminBlogFormValues["status"] }
): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs/${slug}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        `Failed to update blog "${slug}" status`,
        true
    );
}

export async function removeBlog(slug: string): Promise<BlogPostType> {
    return safeFetch<BlogPostType>(
        `${BASE}/api/blogs/${slug}`,
        { method: "DELETE" },
        `Failed to delete blog "${slug}"`,
        true
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

export async function updateCategory(
    data: { id: string } & AdminCategoriesFormValues
): Promise<CategoryType> {
    return safeFetch(
        `${BASE}/api/categories/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update category",
        true
    );
}

export async function removeCategory(id: string): Promise<CategoryType> {
    return safeFetch<CategoryType>(
        `${BASE}/api/categories/${id}`,
        { method: "DELETE" },
        "Failed to delete category",
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
        `${BASE}/api/courses${query ? `?${query}` : ""}`,
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
        `${BASE}/api/faculty/${data.id}`,
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
        `${BASE}/api/faculty/${id}`,
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

export async function createMode(data: Partial<ModeType>): Promise<ModeType> {
    return safeFetch<ModeType>(
        `${BASE}/api/modes`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create mode",
        true
    );
}

export async function updateMode(
    data: { id: string } & Partial<ModeType>
): Promise<ModeType> {
    return safeFetch<ModeType>(
        `${BASE}/api/modes/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update mode",
        true
    );
}

export async function deleteMode(id: string): Promise<ModeType> {
    return safeFetch<ModeType>(
        `${BASE}/api/modes/${id}`,
        { method: "DELETE" },
        "Failed to delete mode",
        true
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

export async function createAttempt(
    data: Partial<AttemptType>
): Promise<AttemptType> {
    return safeFetch<AttemptType>(
        `${BASE}/api/attempts`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create attempt",
        true
    );
}

export async function updateAttempt(
    data: { id: string } & Partial<AttemptType>
): Promise<AttemptType> {
    return safeFetch<AttemptType>(
        `${BASE}/api/attempts/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update attempt",
        true
    );
}

export async function deleteAttempt(id: string): Promise<AttemptType> {
    return safeFetch<AttemptType>(
        `${BASE}/api/attempts/${id}`,
        { method: "DELETE" },
        "Failed to delete attempt",
        true
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
        { method: "GET" },
        "Failed to track visitor"
    );
    return data.count;
}

export async function registerVisitor(): Promise<number> {
    const data = await safeFetch<{ count: number }>(
        `${BASE}/api/visitors`,
        { method: "POST" },
        "Failed to register visitor",
        true
    );
    return data.count;
}

// Notices
export async function fetchNotices(): Promise<NoticeType[]> {
    return safeFetch<NoticeType[]>(
        `${BASE}/api/notices`,
        { method: "GET" },
        "Failed to fetch notices"
    );
}

export async function fetchAdminNotices(): Promise<NoticeType[]> {
    return safeFetch<NoticeType[]>(
        `${BASE}/api/notices`,
        { method: "GET" },
        "Failed to fetch admin notices",
        true
    );
}

export async function createNotice(
    data: AdminNoticeFormValues
): Promise<NoticeType> {
    return safeFetch<NoticeType>(
        `${BASE}/api/notices`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create notice",
        true
    );
}

export async function updateNotice(
    data: { id: string } & AdminNoticeFormValues
): Promise<NoticeType> {
    return safeFetch<NoticeType>(
        `${BASE}/api/notices/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update notice",
        true
    );
}

export async function updateNoticeVisibility(
    id: string,
    visible: boolean
): Promise<NoticeType> {
    return safeFetch<NoticeType>(
        `${BASE}/api/notices/${id}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visible }),
        },
        "Failed to update notice visibility",
        true
    );
}

export async function deleteNotice(id: string): Promise<NoticeType> {
    return safeFetch<NoticeType>(
        `${BASE}/api/notices/${id}`,
        { method: "DELETE" },
        "Failed to delete notice",
        true
    );
}

// Gallery
export async function fetchGallerySlides(): Promise<GalleryItemType[]> {
    return safeFetch<GalleryItemType[]>(
        `${BASE}/api/gallery`,
        { method: "GET" },
        "Failed to fetch gallery slides"
    );
}

export async function fetchAdminGallerySlides(): Promise<GalleryItemType[]> {
    return safeFetch<GalleryItemType[]>(
        `${BASE}/api/gallery`,
        { method: "GET" },
        "Failed to fetch admin gallery slides",
        true
    );
}

export async function createGallerySlide(
    data: AdminGalleryFormValues
): Promise<GalleryItemType> {
    return safeFetch<GalleryItemType>(
        `${BASE}/api/gallery`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create gallery slide",
        true
    );
}

export async function updateGallerySlide(
    data: { id: string } & AdminGalleryFormValues
): Promise<GalleryItemType> {
    return safeFetch<GalleryItemType>(
        `${BASE}/api/gallery/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update gallery slide",
        true
    );
}

export async function updateGallerySlideVisibility(
    id: string,
    visible: boolean
): Promise<GalleryItemType> {
    return safeFetch<GalleryItemType>(
        `${BASE}/api/gallery/${id}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ visible }),
        },
        "Failed to update gallery slide visibility",
        true
    );
}

export async function deleteGallerySlide(id: string): Promise<GalleryItemType> {
    return safeFetch<GalleryItemType>(
        `${BASE}/api/gallery/${id}`,
        { method: "DELETE" },
        "Failed to delete gallery slide",
        true
    );
}

// Tags
export async function fetchTags(): Promise<TagType[]> {
    return safeFetch<TagType[]>(
        `${BASE}/api/tags`,
        { method: "GET" },
        "Failed to fetch tags"
    );
}

export async function createTag(data: { name: string }): Promise<TagType> {
    return safeFetch<TagType>(
        `${BASE}/api/tags`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to create tag",
        true
    );
}

export async function updateTag(data: {
    id: string;
    name: string;
}): Promise<TagType> {
    return safeFetch<TagType>(
        `${BASE}/api/tags/${data.id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        },
        "Failed to update tag",
        true
    );
}

export async function deleteTag(id: string): Promise<TagType> {
    return safeFetch<TagType>(
        `${BASE}/api/tags/${id}`,
        { method: "DELETE" },
        "Failed to delete tag",
        true
    );
}
