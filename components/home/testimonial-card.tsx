import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFacultyInfoCard } from "../course/course-faculty-info-card";

export function TestimonialCard({
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
        <Card className="bg-muted/50 border border-muted hover:shadow-md transition-shadow h-full">
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
