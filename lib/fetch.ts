import {
    CategoryType,
    CourseType,
    EnrollmentType,
    FacultyType,
} from "@/lib/types";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

interface AuthFetchProps {
    server?: boolean;
    headers?: () => Promise<ReadonlyHeaders>;
}

/**
 * A utility type that enforces the presence of a `headers` function 
 * when the `server` property in `AuthFetchProps` is `true`.
 *
 * @template T - A type extending `AuthFetchProps`.
 * @remarks
 * - If `T["server"]` is `true`, the resulting type will include a `headers` method 
 *   that returns a `Promise` resolving to `ReadonlyHeaders`.
 * - If `T["server"]` is not `true`, the type remains unchanged.
 *
 * This is useful for ensuring that server-side fetch operations 
 * always include the necessary headers for authentication or other purposes.
 */
type RequireHeadersIfServer<T extends AuthFetchProps> = T["server"] extends true
    ? T & { headers: () => Promise<ReadonlyHeaders> }
    : T;

export type AuthFetchPropsWithValidation = RequireHeadersIfServer<AuthFetchProps>;

/**
 * Fetches categories with an optional limit.
 * @param count - The maximum number of categories to retrieve.
 * @returns A promise that resolves to an array of categories.
 */
export async function fetchCategories(count?: number): Promise<CategoryType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/categories${
            count !== undefined ? `?count=${encodeURIComponent(count)}` : ""
        }`
    );
    if (response.ok) return await response.json();
    return [];
}

/**
 * Fetches courses based on provided query parameters.
 * @param queryParams - A query string used for filtering courses.
 * @returns A promise that resolves to an array of courses.
 */
export async function fetchCourses(
    queryParams?: string
): Promise<CourseType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses${
            queryParams ? `?${queryParams}` : ""
        }`
    );
    if (response.ok) return await response.json();
    return [];
}

/**
 * Fetches a single course by its ID.
 * @param id - The unique identifier of the course.
 * @returns A promise that resolves to the course object.
 * @throws An error if the course cannot be fetched.
 */
export async function fetchCourseById(id: string): Promise<CourseType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses?${id}`
    );
    if (response.ok) return await response.json();
    throw new Error(`Failed to fetch course with id: ${id}`);
}

/**
 * Fetches a single course by its slug.
 * @param slug - The unique slug of the course.
 * @returns A promise that resolves to the course object.
 * @throws An error if the course cannot be fetched.
 */
export async function fetchCourseBySlug(slug: string): Promise<CourseType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/courses/${slug}`
    );
    if (response.ok) return await response.json();
    throw new Error(`Failed to fetch course with slug: ${slug}`);
}

/**
 * Fetches a list of faculties.
 * @returns A promise that resolves to an array of faculties.
 */
export async function fetchFaculties(): Promise<FacultyType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/faculty`
    );
    if (response.ok) return await response.json();
    return [];
}

/**
 * Fetches a list of enrollments.
 * @returns A promise that resolves to an array of enrollments.
 */
export async function fetchEnrollments({
    server = false,
    headers,
}: AuthFetchProps): Promise<EnrollmentType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/enrollments`,
        {
            credentials: server ? "omit" : "include",
            // Get the request cookies from the server
            headers: {
                cookie:
                    server && headers
                        ? (await headers()).get("cookie") ?? ""
                        : "",
            },
            // Always disable caching for protected fetches
            cache: "no-store",
        }
    );
    if (response.ok) return await response.json();
    return [];
}

/**
 * Checks whether a given course is in the cart.
 * @param courseId - The ID of the course to check.
 * @returns A promise that resolves to a boolean indicating the cart status.
 */
interface AuthIsInCartFetchProps extends AuthFetchProps {
    courseId: string;
}
export async function fetchIsInCart({
    courseId,
    server,
    headers,
}: AuthIsInCartFetchProps): Promise<boolean> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cart?courseId=${courseId}`,
        {
            credentials: server ? "omit" : "include",
            // Get the request cookies from the server
            headers: {
                cookie:
                    server && headers
                        ? (await headers()).get("cookie") ?? ""
                        : "",
            },
            // Always disable caching for protected fetches
            cache: "no-store",
        }
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return false;
}
