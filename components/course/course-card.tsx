"use client";

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
import { fetchEnrollments } from "@/lib/fetch";

interface CourseCardProps {
    course: CourseType;
    actions?: React.ReactNode;
}

export function CourseCard({ course, actions }: CourseCardProps) {
    const { data: session } = useSession();
    const [isEnrolled, setIsEnrolled] = useState(false);

    // Extract and normalize prices
    const price = Number(course.price);
    const discountPrice = Number(course.discountPrice);
    const isOnSale =
        course.onSale && discountPrice && price && discountPrice < price;

    // Check if the user is enrolled in the course
    useEffect(() => {
        const checkEnrollment = async () => {
            if (!session) return;

            try {
                const enrollments = await fetchEnrollments({ server: false });
                const enrolled = enrollments?.some(
                    (e) =>
                        e.courseId === course.id && e.userId === session.user.id
                );
                setIsEnrolled(!!enrolled);
            } catch (error) {
                console.error("Failed to fetch enrollments:", error);
            }
        };

        checkEnrollment();
    }, [session, course.id]);

    return (
        <Card className="pt-0">
            {/* Course Thumbnail with Sale Badge */}
            <Link href={`/courses/${course.slug}`} className="block">
                <CardImage
                    thumbnail={course.thumbnail ?? ""}
                    title={course.title}
                    overlay={
                        isOnSale && (
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

            {/* Course Info Header */}
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    {course.category && (
                        <Badge variant="secondary">
                            {course.category.name}
                        </Badge>
                    )}

                    {/* Price Display (with discount logic) */}
                    <span className="flex items-center gap-2">
                        {isOnSale ? (
                            <>
                                <span className="text-sm md:text-xs text-red-500 line-through">
                                    {formatPrice(price)}
                                </span>
                                <span className="font-semibold text-base md:text-sm text-green-500">
                                    {formatPrice(discountPrice)}
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold text-base md:text-sm text-green-500">
                                {formatPrice(price || 0)}
                            </span>
                        )}
                    </span>
                </div>

                {/* Course Title */}
                <Link href={`/courses/${course.slug}`} className="block">
                    <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
                        {course.title}
                    </h3>
                </Link>
            </CardHeader>

            {/* Faculty Info & Description */}
            <CardContent>
                {course.faculties?.[0] && (
                    <CourseFacultyInfoCard
                        faculty={course.faculties[0]}
                        size="sm"
                    />
                )}
                {course.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                    </p>
                )}
            </CardContent>

            {/* Add to Cart / Custom Actions */}
            <CardFooter className="flex justify-end gap-2 mt-auto">
                {!isEnrolled && <CourseAddCartButton courseId={course.id} />}
                {actions}
            </CardFooter>
        </Card>
    );
}
