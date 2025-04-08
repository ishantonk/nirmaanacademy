import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CoursesSection } from "@/components/home/courses-section";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
    return (
        <div className="flex flex-col">
            <HeroSection />
            <CategoriesSection />
            <CoursesSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
}
