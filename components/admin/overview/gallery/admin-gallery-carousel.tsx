"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { AlertOctagon, AlertTriangle, Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AdminGalleryEdit } from "@/components/admin/overview/gallery/admin-gallery-edit";
import { fetchAdminGallerySlides } from "@/lib/services/api";
import { GalleryItemType } from "@/lib/types";
import { humanize } from "@/lib/utils";

export function AdminGalleryCarousel() {
    // Fetch gallery slides from API
    const {
        data: slides,
        isLoading,
        isError,
    } = useQuery<GalleryItemType[]>({
        queryKey: ["gallerySlides"],
        queryFn: fetchAdminGallerySlides,
    });

    // Handle loading state
    if (isLoading) {
        return (
            <AspectRatio ratio={16 / 9} className="rounded-md">
                <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-muted text-muted-foreground rounded-md">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Loading slides...</span>
                </div>
            </AspectRatio>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <AspectRatio ratio={16 / 9} className="rounded-md">
                <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-destructive/10 text-destructive rounded-md">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                    <span className="text-sm">
                        Failed to load gallery slides.
                    </span>
                </div>
            </AspectRatio>
        );
    }

    // Handle empty slide array
    if (!slides || slides.length === 0) {
        return (
            <AspectRatio ratio={16 / 9} className="rounded-md">
                <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-yellow-400/10 text-yellow-600 rounded-md">
                    <AlertOctagon className="w-6 h-6 animate-caret-blink" />
                    <span className="text-sm">No slides available.</span>
                </div>
            </AspectRatio>
        );
    }

    // Render carousel when data is available
    return (
        <Carousel
            opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
            className="w-full"
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem
                        key={slide.id}
                        data-state={
                            isLoading ? "loading" : isError ? "error" : ""
                        }
                        data-type={slide.type}
                        data-visible={slide.visible ? "true" : "false"}
                        data-sort-order={slide.sortOrder}
                        className="flex flex-col h-full w-full items-center justify-center rounded-md overflow-hidden"
                    >
                        <AspectRatio
                            ratio={16 / 9}
                            className="rounded-md overflow-hidden"
                        >
                            {/* Edit Button (Top Right Corner) */}
                            <EditButton slide={slide} />

                            {/* Overlay Text for Image Slide */}
                            <SlideTextOverlay slide={slide} />

                            {/* Conditionally Render Video or Image Slide */}
                            <VideoSlide slide={slide} />
                            <ImageSlide slide={slide} />
                        </AspectRatio>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Carousel Navigation */}
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots className="lg:flex" />
        </Carousel>
    );
}

// Renders title and subtitle overlay for image slides only
function SlideTextOverlay({ slide }: { slide: GalleryItemType }) {
    if (slide.type === "VIDEO") return null;

    if (slide.type === "IMAGE")
        return (
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-center gap-y-1 px-4 py-2 text-background z-10">
                {/* Gradient overlay background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 dark:from-white/90 to-transparent" />

                {/* Title */}
                {slide.title && (
                    <h2 className="text-xl font-semibold drop-shadow-lg line-clamp-1">
                        {humanize(slide.title)}
                    </h2>
                )}

                {/* Subtitle */}
                {slide.subtitle && (
                    <p className="text-sm drop-shadow-lg line-clamp-2">
                        {humanize(slide.subtitle)}
                    </p>
                )}
            </div>
        );
}

// Renders edit icon component for each slide
function EditButton({ slide }: { slide: GalleryItemType }) {
    return (
        <div className="absolute top-4 right-4 z-10">
            <AdminGalleryEdit slide={slide} />
        </div>
    );
}

// Handles rendering and loading state of video slides
function VideoSlide({ slide }: { slide: GalleryItemType }) {
    // Lazy-load ReactPlayer for client-side rendering
    const ReactPlayer = dynamic(() => import("react-player/lazy"), {
        ssr: false,
    });
    const [isVideoReady, setIsVideoReady] = useState(false);

    if (slide.type === "IMAGE") return null;

    const validVideoURL =
        slide.videoUrl !== null && slide.videoUrl !== ""
            ? slide.videoUrl
            : null;

    // Show warning if no video URL is provided
    if (!validVideoURL) {
        return (
            <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-yellow-400/10 text-yellow-600 rounded-md">
                <AlertOctagon className="w-6 h-6 animate-caret-blink" />
                <span className="text-sm">No video URL provided.</span>
            </div>
        );
    }

    return (
        <>
            {/* Accessible video title */}
            <span className="sr-only hidden">{slide.title}</span>

            {/* Loading spinner until video is ready */}
            {!isVideoReady && (
                <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-muted text-muted-foreground rounded-md">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-sm">Loading video...</span>
                </div>
            )}

            {/* Render video player */}
            <ReactPlayer
                url={validVideoURL}
                width="100%"
                height="100%"
                controls
                playing={false}
                onReady={() => setIsVideoReady(true)}
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                            disablePictureInPicture: true,
                        },
                    },
                }}
            />
        </>
    );
}

// Renders image slide or fallback warning if URL is missing
function ImageSlide({ slide }: { slide: GalleryItemType }) {
    if (slide.type === "VIDEO") return null;

    const validImageURL =
        slide.imageUrl !== null && slide.imageUrl !== ""
            ? slide.imageUrl
            : null;

    if (!validImageURL) {
        return (
            <div className="flex flex-row justify-center items-center w-full h-full gap-2 bg-yellow-400/10 text-yellow-600 rounded-md">
                <AlertOctagon className="w-6 h-6 animate-caret-blink" />
                <span className="text-sm">No image URL provided.</span>
            </div>
        );
    }

    return (
        <Image
            src={validImageURL}
            alt={slide.title ?? "Gallery Slide"}
            fill
            className="h-full w-full object-cover"
            priority
        />
    );
}
