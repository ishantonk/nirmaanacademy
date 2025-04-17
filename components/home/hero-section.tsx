"use client";

import Image from "next/image";
import { NoticeCard } from "@/components/home/notice-card";
import { CourseCategoriesCard } from "@/components/home/course-categories-card";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
    const isMobile = useIsMobile();

    return (
        <section className="relative w-full overflow-hidden py-4 lg:py-12">
            {/* Background Image */}
            <div className="absolute inset-0 z-[-1]">
                <Image
                    src="/bg-hero.jpg" // Update this path with your background image
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    style={{
                        objectPosition: "center",
                        backgroundAttachment: "fixed",
                    }}
                />
            </div>
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 h-full grid grid-cols-2 lg:grid-cols-4 items-center justify-center">
                {!isMobile && (
                    <div className="hidden md:flex col-span-1 p-4 items-center justify-center">
                        <NoticeCard />
                    </div>
                )}
                <div className="col-span-2 p-4 flex items-center justify-center">
                    <HeroCarousel />
                </div>
                {isMobile && (
                    <div className="flex md:hidden col-span-2 w-full p-4 items-center justify-center">
                        <NoticeCard />
                    </div>
                )}
                <div className="col-span-2 lg:col-span-1 p-4 flex items-center justify-center">
                    <CourseCategoriesCard />
                </div>
            </div>
        </section>
    );
}
