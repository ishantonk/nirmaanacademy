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
import { CourseBuyNow } from "./course-buy-now";
import { fetchEnrollments } from "@/lib/services/api";
import { Button } from "../ui/button";
import { ArrowRight, Check, CornerRightUp } from "lucide-react";

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
                const enrollments = await fetchEnrollments();
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
        <Card className="pt-0 h-full max-w-sm md:max-w-fit">
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
                <div className="flex justify-between">
                    {course.category && (
                        <Badge variant="secondary" className="scale-75">
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
                    <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">
                        {course.title}
                    </h3>
                </Link>
            </CardHeader>

            {/* Faculty Info & Description */}
            <CardContent className="mt-auto">
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
            <CardFooter className="flex justify-end gap-2">
                {!isEnrolled ? (
                    <>
                        <CourseAddCartButton
                            size="icon"
                            courseId={course.id}
                            attemptId={course.availableAttempts[0].id}
                            modeId={course.availableModes[0].id}
                        />
                        <CourseBuyNow courseId={course.id} />
                    </>
                ) : (
                    <Button variant="outline" className="gap-x-2 group" asChild>
                        <Link href={`/courses/${course.slug}`}>
                            Go to Course
                            <ArrowRight className="group-hover:translate-x-1 transition-transform h-4 w-4" />
                        </Link>
                    </Button>
                )}
                {actions}
            </CardFooter>
        </Card>
    );
}
