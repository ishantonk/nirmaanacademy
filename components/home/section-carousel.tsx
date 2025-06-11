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
import useIsMobile from "@/hooks/use-mobile";

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

// Define mapping for basis classes to ensure they exist in the bundle
const BASIS_CLASSES = {
    1: "basis-full",
    2: "basis-1/2",
    3: "basis-1/3",
    4: "basis-1/4",
    5: "basis-1/5",
    6: "basis-1/6",
} as const;

const RESPONSIVE_BASIS_CLASSES = {
    1: {
        mobile: "basis-full",
        tablet: "md:basis-full",
        desktop: "lg:basis-full",
    },
    2: { mobile: "basis-1/2", tablet: "md:basis-1/2", desktop: "lg:basis-1/2" },
    3: { mobile: "basis-1/3", tablet: "md:basis-1/3", desktop: "lg:basis-1/3" },
    4: { mobile: "basis-1/4", tablet: "md:basis-1/4", desktop: "lg:basis-1/4" },
    5: { mobile: "basis-1/5", tablet: "md:basis-1/5", desktop: "lg:basis-1/5" },
    6: { mobile: "basis-1/6", tablet: "md:basis-1/6", desktop: "lg:basis-1/6" },
} as const;

export default function SectionCarousel({
    items,
    autoplay = true,
    autoplayDelay = 3000,
    itemsPerView = DEFAULT_ITEMS_PER_VIEW,
    className = "",
}: SectionCarouselProps) {
    const isMobile = useIsMobile();

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

        // Ensure the values are within our supported range
        const safeMobile = Math.max(
            1,
            Math.min(6, mobile)
        ) as keyof typeof RESPONSIVE_BASIS_CLASSES;
        const safeTablet = Math.max(
            1,
            Math.min(6, tablet)
        ) as keyof typeof RESPONSIVE_BASIS_CLASSES;
        const safeDesktop = Math.max(
            1,
            Math.min(6, desktop)
        ) as keyof typeof RESPONSIVE_BASIS_CLASSES;

        return [
            RESPONSIVE_BASIS_CLASSES[safeMobile].mobile,
            RESPONSIVE_BASIS_CLASSES[safeTablet].tablet,
            RESPONSIVE_BASIS_CLASSES[safeDesktop].desktop,
        ].join(" ");
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
