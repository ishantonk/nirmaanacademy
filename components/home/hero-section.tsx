import Image from "next/image";
import { NoticeCard } from "@/components/home/notice-card";
import { CourseCategoriesCard } from "@/components/home/course-categories-card";
import { HeroCarousel } from "@/components/home/hero-carousel";

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden py-12">
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
            <div className="relative z-10 h-full grid grid-cols-4 items-center">
                <div className="col-span-1 p-4 flex items-center justify-center">
                    <NoticeCard />
                </div>
                <div className="col-span-2 p-4 flex items-center justify-center">
                    <HeroCarousel />
                </div>
                <div className="col-span-1 p-4 flex items-center justify-center">
                    <CourseCategoriesCard />
                </div>
            </div>
        </section>
    );
}
