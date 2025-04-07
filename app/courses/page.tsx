import { Search } from "lucide-react";
import { CourseFilters } from "@/components/course/course-filters";
import { CourseGrid } from "@/components/course/course-grid";
import { Input } from "@/components/ui/input";
import { CategoryType, CourseType } from "@/lib/types";
import { CourseCard } from "@/components/course/course-card";
import { CourseAddCartButton } from "@/components/course/course-add-cart";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface CoursesPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
        price?: string;
        sort?: string;
    }>;
}

async function getCourses(searchParams: {
    category?: string;
    search?: string;
    price?: string;
    sort?: string;
}) {
    const filteredParams = Object.entries(searchParams)
        .filter(([, value]) => typeof value === "string")
        .reduce((acc, [key, value]) => {
            acc[key] = value as string;
            return acc;
        }, {} as Record<string, string>);

    const params = new URLSearchParams(filteredParams);
    const response = await fetch(
        `${process.env.DOMAIN}/api/courses?${params.toString()}`
    );

    if (response.ok) {
        const courses: CourseType[] = await response.json();
        return courses;
    }
    return [];
}

async function getCategories() {
    const response = await fetch(`${process.env.DOMAIN}/api/categories`);
    if (response.ok) {
        const categories: CategoryType[] = await response.json();
        return categories;
    }
    return [];
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
    const session = await getAuthSession();
    const params = await Promise.resolve(searchParams);
    const courses = await getCourses(params);
    const categories = await getCategories();

    // Check if user has this course in cart
    async function checkIfInCart(courseId: string) {
        let isInCart = false;
        if (session) {
            const cartItem = await prisma.cartItem.findFirst({
                where: {
                    userId: session.user.id,
                    courseId,
                },
            });

            isInCart = !!cartItem;
        }
        return isInCart;
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Browse Courses</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar with filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="sticky top-20">
                        <CourseFilters categories={categories} />
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <form action="/courses" method="GET">
                            {/* Preserve other query params */}
                            {params.category && (
                                <input
                                    type="hidden"
                                    name="category"
                                    value={params.category}
                                />
                            )}
                            {params.price && (
                                <input
                                    type="hidden"
                                    name="price"
                                    value={params.price}
                                />
                            )}
                            {params.sort && (
                                <input
                                    type="hidden"
                                    name="sort"
                                    value={params.sort}
                                />
                            )}

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    name="search"
                                    placeholder="Search courses..."
                                    className="pl-10"
                                    defaultValue={params.search}
                                />
                            </div>
                        </form>
                    </div>

                    <CourseGrid
                        courses={await Promise.all(
                            courses.map(async (course) => {
                                const isInCart = await checkIfInCart(course.id);
                                return (
                                    <CourseCard
                                        key={course.id}
                                        href={`/courses/${course.slug}`}
                                        course={course}
                                        actions={
                                            <CourseAddCartButton
                                                courseId={course.id}
                                                isInCart={isInCart}
                                            />
                                        }
                                    />
                                );
                            })
                        )}
                    />
                </div>
            </div>
        </>
    );
}
