import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoursesCarousel } from "@/components/home/courses-carousel";
import { CourseType } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export async function CoursesSection() {
    const courses: CourseType[] = await getFeaturedCourses();

    return (
        <section className="bg-muted/30 py-2">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Featured Courses
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Explore our most popular and highly-rated courses
                        </p>
                    </div>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/courses">
                            View All Courses
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* carousel */}
                <CoursesCarousel courses={courses} />
            </div>
        </section>
    );
}

async function getFeaturedCourses(): Promise<CourseType[]> {
    return await prisma.course.findMany({
        where: {
            featured: true,
            status: "PUBLISHED",
        },
        include: {
            category: true,
            faculties: true,
        },
        take: 8,
    });
}
