"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AdminGallerySlideEdit } from "@/components/admin/overview/gallery/admin-overview-gallery-slide-edit";
import { fetchAdminGallerySlides } from "@/lib/services/api";
import { GalleryItemType } from "@/lib/types";

// dynamic import so SSR doesn't try to render it
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export function AdminGalleryCarousel() {
    const [isReady, setIsReady] = useState(false);
    const {
        data: slides,
        isLoading,
        isError,
    } = useQuery<GalleryItemType[]>({
        queryKey: ["gallerySlides"],
        queryFn: fetchAdminGallerySlides,
    });

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
                            <div className="absolute top-4 right-4 z-10">
                                <AdminGallerySlideEdit slide={slides} />
                            </div>
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                {slides.type === "VIDEO" ? (
                                    slides.videoUrl &&
                                    slides.videoUrl !== "" ? (
                                        <>
                                            {!isReady && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">
                                                        Loading video...
                                                    </p>
                                                </div>
                                            )}
                                            <div className="sr-only hidden">
                                                {slides.title}
                                            </div>
                                            <ReactPlayer
                                                url={slides.videoUrl}
                                                width="100%"
                                                height="100%"
                                                controls
                                                playing={false}
                                                onReady={() => setIsReady(true)}
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            controlsList:
                                                                "nodownload",
                                                            disablePictureInPicture:
                                                                true,
                                                        },
                                                    },
                                                }}
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
            <CarouselDots className="lg:flex" />
        </Carousel>
    );
}
