import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardImage,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseAddCartButton } from "@/components/course/course-add-cart";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { CourseType } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { serializeDecimal } from "@/lib/utils";

interface CourseCardProps {
    course: CourseType;
    actions?: React.ReactNode;
}

export function CourseCard({ course, actions }: CourseCardProps) {
    // Retrieve session from useSession.
    const { data: session } = useSession();
    // Initialize cart status state.
    const [isInCart, setIsInCart] = useState<boolean>(false);

    // Serialize the price and discountPrice to a number
    const price = serializeDecimal(course.price ?? null);
    const discountPrice = serializeDecimal(course.discountPrice ?? null);

    useEffect(() => {
        // If there's an active session, check for cart items.
        if (session && course.cartItems) {
            // Determine if the course is in the user's cart.
            const cartStatus = course.cartItems.find(
                (cartItem) =>
                    cartItem.courseId === course.id &&
                    cartItem.userId === session.user.id
            );
            setIsInCart(!!cartStatus);
        }
    }, [session, course]);

    return (
        <Card className="pt-0">
            <Link href={`/courses/${course.slug}`} className="block">
                <CardImage
                    thumbnail={course.thumbnail ?? ""}
                    title={course.title}
                    overlay={
                        course.onSale && (
                            <Badge
                                variant="destructive"
                                className="absolute top-2 right-2 opacity-65"
                            >
                                On Sale
                            </Badge>
                        )
                    }
                />
            </Link>

            <CardHeader className="space-y-1">
                <div className="flex items-center col-span-2 justify-between">
                    {course.category && (
                        <Badge variant="secondary">
                            {course.category.name}
                        </Badge>
                    )}
                    {course.onSale &&
                    discountPrice &&
                    price &&
                    discountPrice < price ? (
                        <span className="flex items-center gap-2">
                            <span className="text-sm md:text-xs text-red-500 line-through">
                                {formatPrice(price)}
                            </span>
                            <span className="font-semibold text-base md:text-sm text-green-500">
                                {formatPrice(discountPrice)}
                            </span>
                        </span>
                    ) : (
                        <span className="font-semibold text-base md:text-sm text-green-500">
                            {formatPrice(price ? price : 0)}
                        </span>
                    )}
                </div>
                <Link href={`/courses/${course.slug}`} className="block">
                    <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
                        {course.title}
                    </h3>
                </Link>
            </CardHeader>

            <CardContent className="mb-auto">
                {course.faculties && (
                    <CourseFacultyInfoCard
                        faculty={course.faculties?.[0]}
                        size="sm"
                    />
                )}
                {course.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                    </p>
                )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <CourseAddCartButton courseId={course.id} isInCart={isInCart} />
                {actions && actions}
            </CardFooter>
        </Card>
    );
}
