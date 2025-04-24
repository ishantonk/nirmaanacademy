"use client";

import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AdminGallerySlideEdit } from "./admin-overview-gallery-slide-edit";

export function AdminGalleryCarousel() {
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
                {Array.from({ length: 5 }, (_, index) => (
                    <CarouselItem
                        key={index}
                        className="relative flex h-full w-full items-center justify-center"
                    >
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                            {/* <AdminGallerySlideEdit slide={} /> */}
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                <Image
                                    src="/placeholder.svg"
                                    alt={"Students learning online " + index}
                                    height={300}
                                    width={600}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
        </Carousel>
    );
}
