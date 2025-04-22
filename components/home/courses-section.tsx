import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoursesCarousel } from "@/components/home/courses-carousel";
import { fetchCourses } from "@/lib/services/api";

export async function CoursesSection() {
    const params = new URLSearchParams();
    params.append("count", "8");
    params.append("featured", "true");
    const queryString = params.toString();

    const courses = await fetchCourses(queryString);

    return (
        <section className="bg-amber-100/50 py-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl lg:text-3xl font-bold tracking-tight">
                            Featured Courses
                        </h2>
                        <p className="text-sm lg:text-base mt-2 text-muted-foreground">
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
