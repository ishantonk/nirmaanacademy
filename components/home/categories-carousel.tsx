"use client";

import { Notebook } from "lucide-react";
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
import { CategoryCard } from "@/components/home/category-card";
import { CategoryType } from "@/lib/types";

export function CategoriesCarousel({
    categories,
}: {
    categories: CategoryType[];
}) {
    if (categories.length === 0) {
        return (
            <EmptyState
                icon={Notebook}
                title="No category found"
                description="Try adjusting your search or filter to find what you're looking for."
            />
        );
    }

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 3000,
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
                {categories.map((category, i) => (
                    <CarouselItem
                        key={category.id}
                        className="basis-1/2 lg:basis-1/4"
                    >
                        <CategoryCard
                            category={category}
                            courseCount={category._count?.courses ?? 0}
                            color={
                                i % 4 === 0
                                    ? "bg-blue-800/10"
                                    : i % 4 === 1
                                    ? "bg-green-800/10"
                                    : i % 4 === 2
                                    ? "bg-red-800/10"
                                    : "bg-yellow-800/10"
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
