"use client";

import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import Autoplay from "embla-carousel-autoplay";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsCarousel() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2500,
                    stopOnMouseEnter: true,
                }),
            ]}
            opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
            }}
            className="w-full"
        >
            <CarouselContent>
                {testimonials.map((testimonial, i) => (
                    <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                        <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
