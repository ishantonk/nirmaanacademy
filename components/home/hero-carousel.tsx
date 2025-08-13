"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchGallerySlides } from "@/lib/services/api";
import { GalleryItemType } from "@/lib/types";
import VideoPlayer from "../ui/video-player";

export function HeroCarousel() {
    const {
        data: slides,
        isLoading,
        isError,
    } = useQuery<GalleryItemType[]>({
        queryKey: ["gallerySlides"],
        queryFn: fetchGallerySlides,
    });

    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 4000,
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
                {slides?.map((slides) => (
                    <CarouselItem
                        key={slides.id}
                        className="relative flex h-full w-full items-center justify-center"
                        data-state={
                            isLoading ? "loading" : isError ? "error" : ""
                        }
                        data-type={slides.type}
                        data-visible={slides.visible ? "true" : "false"}
                        data-sort-order={slides.sortOrder}
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <div className="absolute inset-x-0 bottom-0 p-2 z-10">
                                {slides.type === "IMAGE" && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                                        {slides.title && (
                                            <h2 className="px-4 text-xl font-bold text-white drop-shadow-lg">
                                                {slides.title}
                                            </h2>
                                        )}
                                        {slides.subtitle && (
                                            <p className="px-4 mt-1 text-base text-white drop-shadow">
                                                {slides.subtitle}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                {slides.type === "VIDEO" ? (
                                    slides.videoUrl &&
                                    slides.videoUrl !== "" ? (
                                        <>
                                            <div className="sr-only hidden">
                                                {slides.title}
                                            </div>
                                            <VideoPlayer 
                                                videoUrl={slides.videoUrl}
                                                autoPlay={false}
                                                controls={true}
                                            />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground">
                                                No video URL provided
                                            </p>
                                        </div>
                                    )
                                ) : slides.imageUrl &&
                                  slides.imageUrl !== "" ? (
                                    <Image
                                        src={slides.imageUrl}
                                        alt={slides.title ?? "Gallery Slide"}
                                        height={300}
                                        width={600}
                                        className="h-full w-full object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-sm text-muted-foreground">
                                            No image URL provided
                                        </p>
                                    </div>
                                )}
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
