"use client";

import { User } from "lucide-react";
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
import { FacultyType } from "@/lib/types";
import { FacultyCard } from "@/components/faculty/faculty-card";

export function FacultiesCarousel({ faculties }: { faculties: FacultyType[] }) {
    if (faculties.length === 0) {
        return (
            <EmptyState
                icon={User}
                title="No faculty found"
                description="Try adjusting your search or filter to find what you're looking for."
            />
        );
    }

    return (
        <Carousel
            plugins={[Autoplay({ delay: 2500, stopOnMouseEnter: true })]}
            opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
            }}
            className="w-full"
        >
            <CarouselContent>
                {faculties.map((faculty) => (
                    <CarouselItem
                        key={faculty.id}
                        className="basis-1/2 lg:basis-1/4"
                    >
                        <FacultyCard faculty={faculty} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
