import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
        <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent>
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                        </p>
                    </div>
                </div>
                <p className="text-muted-foreground italic mb-4">
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
