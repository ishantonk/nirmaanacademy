"use client";

import { BookOpen } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
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
            plugins={[Autoplay({ delay: 3500, stopOnMouseEnter: true })]}
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
                        className="flex justify-center md:basis-1/2 lg:basis-1/4"
                    >
                        <CourseCard course={course} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
