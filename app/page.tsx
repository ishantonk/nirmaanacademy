import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CoursesSection } from "@/components/home/courses-section";
import { CTASection } from "@/components/home/CTA-section";
import { VisitorsCounterSection } from "@/components/home/visitors-counter-section";
import { FacultySection } from "@/components/home/faculty-section";

export default function Home() {
    return (
        <div className="flex flex-col">
            <HeroSection />
            <CategoriesSection />
            <CoursesSection />
            <FacultySection />
            <TestimonialsSection />
            <CTASection />
            <VisitorsCounterSection />
        </div>
    );
}
