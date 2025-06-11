"use client";

import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ItemsPerView {
    mobile?: number;
    tablet?: number;
    desktop?: number;
}

interface SectionCarouselProps {
    items: React.ReactElement[];
    autoplay?: boolean;
    autoplayDelay?: number;
    itemsPerView?: ItemsPerView;
    className?: string;
}

const DEFAULT_ITEMS_PER_VIEW: ItemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
};

export default function SectionCarousel({
    items,
    autoplay = true,
    autoplayDelay = 3000,
    itemsPerView = DEFAULT_ITEMS_PER_VIEW,
    className = "",
}: SectionCarouselProps) {
    // Memoize carousel plugins to prevent recreating on every render
    const plugins = useMemo(() => {
        if (!autoplay) return undefined;

        return [
            Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: true,
            }),
        ];
    }, [autoplay, autoplayDelay]);

    // Memoize responsive classes to avoid recalculation
    const responsiveClasses = useMemo(() => {
        const {
            mobile = 2,
            tablet = 3,
            desktop = 4,
        } = {
            ...DEFAULT_ITEMS_PER_VIEW,
            ...itemsPerView,
        };

        return `basis-1/${mobile} md:basis-1/${tablet} lg:basis-1/${desktop}`;
    }, [itemsPerView]);

    // Early return if no items
    if (!items?.length) return null;

    return (
        <Carousel
            plugins={plugins}
            opts={{
                align: "start",
                loop: true,
                containScroll: "trimSnaps",
            }}
            className="w-full"
        >
            <CarouselContent className="py-6 px-2">
                {items.map((item, idx) => (
                    <CarouselItem
                        key={item.key || idx}
                        className={cn(responsiveClasses, className)}
                    >
                        {item}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
