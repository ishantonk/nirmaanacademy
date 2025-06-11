import { testimonials } from "@/data/testimonials";
import SectionCarousel from "./section-carousel";
import SectionHeading from "./section-heading";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";

export function TestimonialsSection() {
    const testimonialsItems = testimonials.map((testimonial, idx) => (
        <TestimonialCard testimonial={testimonial} key={idx} />
    ));

    return (
        <section className="bg--background py-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <SectionHeading
                    title="What Our Students Say"
                    description="Discover what our students have to say about their learning experiences and achievements."
                />

                {/* carousel */}
                <SectionCarousel
                    autoplay
                    itemsPerView={{ mobile: 1, desktop: 3 }}
                    items={testimonialsItems}
                />
            </div>
        </section>
    );
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: {
        image: string;
        name: string;
        role: string;
        content: string;
        rating: number;
    };
}) {
    return (
        <Card className="bg-surface/50 border border-muted hover:shadow-md transition-shadow h-full">
            <CardContent>
                <div className="flex items-center gap-4 mb-4">
                    <CourseFacultyInfoCard
                        faculty={{
                            id: testimonial.name + testimonial.role,
                            name: testimonial.name,
                            image: testimonial.image,
                            designation: testimonial.role,
                            email: "",
                            bio: "",
                            phone: "",
                            createdAt: new Date(Date.now()),
                            updatedAt: new Date(Date.now()),
                        }}
                    />
                </div>
                <p className="text-muted-foreground italic mb-4 line-clamp-6">
                    {testimonial.content}
                </p>
                <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, star) => (
                        <Star
                            key={star}
                            className={`h-4 w-4 ${
                                star < testimonial.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                            }`}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
