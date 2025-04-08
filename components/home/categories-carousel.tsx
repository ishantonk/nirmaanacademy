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
import { CategoryCard } from "@/components/home/category-card";
import { CategoryType } from "@/lib/types";

export function CategoriesCarousel({categories} : {categories : CategoryType[]}) {
    if (categories.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title="No category found"
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
                {categories.map((category, i) => (
                    <CarouselItem
                        key={category.id}
                        className="basis-1/2 lg:basis-1/4"
                    >
                        <CategoryCard
                            category={category}
                            courseCount={category._count.courses}
                            color={
                                i % 2 === 0
                                    ? "bg-blue-200"
                                    : i % 3 === 0
                                    ? "bg-green-200"
                                    : i % 4 === 0
                                    ? "bg-red-200"
                                    : ""
                            }
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
