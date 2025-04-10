"use client";

import { BookOpen } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { EmptyState } from "@/components/ui/empty-state";
import { CourseCard } from "@/components/course/course-card";
import { CourseType } from "@/lib/types";

export function CoursesCarousel({ courses }: { courses: CourseType[] }) {
    if (courses.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title="No courses found"
                description="Try adjusting your search or filter to find what you're looking for."
            />
        );
    }
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
            }}
            className="w-full"
        >
            <CarouselContent>
                {courses.map((course) => (
                    <CarouselItem
                        key={course.id}
                        className="md:basis-1/2 lg:basis-1/4"
                    >
                        <CourseCard
                            course={course}
                            href={"/courses/" + course.slug}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
