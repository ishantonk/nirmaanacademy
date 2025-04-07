import Image from "next/image";
import { Award, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CourseAddCartButton } from "@/components/course/course-add-cart";
import { formatDuration, formatPrice } from "@/lib/format";
import { CourseFacultyInfoCard } from "@/components/course/course-faculty-info-card";
import { CourseType } from "@/lib/types";
import { serializeDecimal } from "@/lib/utils";
import { CourseContentInfo } from "@/components/course/course-content-info";
import { CourseReviews } from "@/components/course/course-reviews";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function CoursePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const session = await getAuthSession();
    const { slug } = await params;
    const course: CourseType = await fetch(
        `${process.env.DOMAIN}/api/courses/${slug}`
    ).then((res) => res.json());

    // Serialize the price and discountPrice to a number
    const price = serializeDecimal(course.price ?? null);
    const discountPrice = serializeDecimal(course.discountPrice ?? null);

    if (!course) {
        return notFound();
    }

    // Calculate average rating
    const averageRating =
        course.reviews && course.reviews.length > 0
            ? course.reviews.reduce(
                  (total, review) => total + review.rating,
                  0
              ) / course.reviews.length
            : 0;

    // Check if user is enrolled
    let isEnrolled = false;

    if (session) {
        const enrollment = course.enrollments?.find(
            (enrollment) => enrollment.userId === session.user.id
        );
        // Check if the user is enrolled in the course
        isEnrolled = !!enrollment;
    }

    // Check if user has this course in cart
    let isInCart = false;

    if (session) {
        const cartItem = course.cartItems?.find(
            (cartItem) =>
                cartItem.userId === session.user.id &&
                cartItem.courseId === course.id
        );

        isInCart = !!cartItem;
    }

    return (
        <>
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            {course.thumbnail ? (
                                <Image
                                    src={course.thumbnail || "/placeholder.svg"}
                                    alt={course.title}
                                    fill
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-muted-foreground">
                                    No thumbnail
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* category */}
                    {course.category && (
                        <Badge className="w-fit">{course.category.name}</Badge>
                    )}

                    {/* title */}
                    <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>

                    {/* Number of reviews and enrollments */}
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 font-medium">
                                {averageRating}
                            </span>
                            <span className="ml-1 text-muted-foreground">
                                {course.reviews?.length
                                    ? `(${course.reviews?.length} reviews)`
                                    : "(No reviews yet)"}
                            </span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                {course.enrollments?.length || 0} students
                            </span>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                {formatDuration(course.durationInMin * 60)}
                            </span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Certificate of completion
                            </span>
                        </div>
                    </div>

                    {/* Main faculty avatar and info */}
                    <div className="mt-4 flex items-center gap-2">
                        <CourseFacultyInfoCard
                            faculty={course.faculties?.[0] || null}
                        />
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <div className="flex items-center gap-2">
                            {course.onSale &&
                            discountPrice &&
                            price &&
                            discountPrice < price ? (
                                <span className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-green-500">
                                        {formatPrice(discountPrice)}
                                    </span>
                                    <span className="text-lg text-muted-foreground line-through">
                                        {formatPrice(price)}
                                    </span>
                                </span>
                            ) : (
                                <span className="text-3xl font-bold text-green-500">
                                    {formatPrice(price ? price : 0)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Mode and attempt select */}
                    <div className="mt-4 flex gap-2">
                        <Select>
                            <SelectTrigger className="w-44 lg:min-w-fit">
                                <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {course.availableModes?.map((mode) => (
                                        <SelectItem
                                            key={mode.id}
                                            value={mode.slug}
                                        >
                                            {mode.name}
                                        </SelectItem>
                                    )) ?? (
                                        <SelectItem value="download-link-with-handbook">
                                            Download link with handbook
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-32 lg:min-w-fit">
                                <SelectValue placeholder="Select attempt" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {course.availableAttempts?.map(
                                        (attempt) => (
                                            <SelectItem
                                                key={attempt.id}
                                                value={attempt.slug}
                                            >
                                                {attempt.name}
                                            </SelectItem>
                                        )
                                    ) ?? (
                                        <SelectItem value="download-link-with-handbook">
                                            June 2024
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/*Course add cart button */}
                    <div className="mt-4 flex gap-2">
                        <div className="mt-6 w-full">
                            <CourseAddCartButton
                                courseId={"1"}
                                isInCart={isInCart}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="space-y-8">
                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold">
                                About this course
                            </h2>
                            <div className="mt-4 prose max-w-none">
                                <p>{course.description}</p>
                            </div>
                        </div>

                        {/* Course content table */}
                        <CourseContentInfo
                            selectedMode={course.selectedMode}
                            duration={course.durationInMin}
                            enrollments={course.enrollments}
                            videoLanguage={course.videoLanguage}
                            courseMaterialLanguage={
                                course.courseMaterialLanguage
                            }
                        />

                        {/* All faculties in this course */}
                        <div>
                            <h2 className="text-2xl font-bold">
                                All faculties in this course
                            </h2>
                            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                                {course.faculties?.map((faculty) => (
                                    <CourseFacultyInfoCard
                                        key={faculty.id}
                                        faculty={faculty}
                                        size="lg"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-2xl font-bold">Reviews</h2>
                            <div className="mt-4">
                                {course.reviews && (
                                    <CourseReviews
                                        reviews={course.reviews}
                                        courseId={course.id}
                                        isEnrolled={isEnrolled}
                                        averageRating={averageRating}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Todo: add carousel for related course */}
                    </div>
                </div>

                {/* sidebar */}
                <div>
                    <div className="rounded-lg border p-4 sticky top-25">
                        <h3 className="text-lg font-semibold">
                            This course includes:
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {formatDuration(course.durationInMin * 60)}{" "}
                                    of on-demand video
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <span>Certificate of completion</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {course.enrollments?.length} students
                                    enrolled
                                </span>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <CourseAddCartButton
                                courseId={"2"}
                                isInCart={isInCart}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
