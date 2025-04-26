"use client";

import Image from "next/image";
import { NoticeCard } from "@/components/home/notice-card";
import { CourseCategoriesCard } from "@/components/home/course-categories-card";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
    const isMobile = useIsMobile();
    const isDesktop = !isMobile;

    return (
        <section className="relative w-full overflow-hidden py-4 lg:py-12 bg-gradient-to-t from-muted via-transparent to-transparent">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/bg-hero.jpg" // Update this path with your background image
                    alt="Hero Background"
                    fill
                    className="object-cover object-center brightness-50"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full grid grid-cols-2 lg:grid-cols-4 items-center justify-center">
                {isDesktop && (
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
