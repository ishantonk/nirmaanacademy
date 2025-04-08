import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/course/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Search } from "lucide-react";
import { CategoryType } from "@/lib/types";

interface SearchPageProps {
    searchParams: {
        q?: string;
        category?: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = (searchParams?.q as string) || "";
    const categoryId = searchParams?.category as string | undefined;

    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Search Courses</h1>

            <div className="flex flex-col gap-6">
                <SearchForm initialQuery={query} />

                <SearchResults query={query} categoryId={categoryId} />
            </div>
        </div>
    );
}

function SearchForm({ initialQuery }: { initialQuery: string }) {
    return (
        <form action="/search" className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    name="q"
                    placeholder="Search courses..."
                    defaultValue={initialQuery}
                    className="pl-10"
                />
            </div>
            <Button type="submit">Search</Button>
        </form>
    );
}

async function SearchResults({
    query,
    categoryId,
}: {
    query: string;
    categoryId?: string;
}) {
    // If no query, show categories
    if (!query && !categoryId) {
        const categories = await getCategories();

        return (
            <div>
                <h2 className="text-xl font-semibold mb-4">
                    Browse by Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant="outline"
                            className="h-auto py-4 justify-start"
                            asChild
                        >
                            <a href={`/search?category=${category.id}`}>
                                {category.name}
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }

    // Search courses
    const courses = await prisma.course.findMany({
        where: {
            status: "PUBLISHED",
            ...(query && {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
            ...(categoryId && {
                categoryId,
            }),
        },
        include: {
            category: true,
            faculties: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (courses.length === 0) {
        return (
            <EmptyState
                title="No courses found"
                description={`We couldn't find any courses matching "${query}". Try a different search term.`}
                action={
                    <Button asChild variant="outline">
                        <a href="/search">Clear Search</a>
                    </Button>
                }
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <h2 className="text-xl font-semibold mb-4">
                {courses.length} {courses.length === 1 ? "course" : "courses"}{" "}
                found
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        href={`/courses/${course.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}

async function getCategories() {
    const response = await fetch(`${process.env.DOMAIN}/api/categories`);
    if (response.ok) {
        const categories: CategoryType[] = await response.json();
        return categories;
    }
    return [];
}
