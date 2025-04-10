import { TestimonialsCarousel } from "./testimonials-carousel";

export function TestimonialsSection() {
    return (
        <section className="bg-muted/30 py-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex flex-col items-start mb-12">
                    <h2 className="text-xl lg:text-3xl font-bold tracking-tight">
                        What Our Students Say
                    </h2>
                    <p className="text-sm lg:text-base mt-4 text-muted-foreground max-w-2xl">
                        Hear from our students about how Nirmaan Academy has
                        helped them achieve their learning goals and advance
                        their careers.
                    </p>
                </div>

                {/* carousel */}
                <TestimonialsCarousel />
            </div>
        </section>
    );
}
