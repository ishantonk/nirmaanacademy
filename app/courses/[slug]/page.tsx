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
import { CourseContentInfo } from "@/components/course/course-content-info";
import { CourseReviews } from "@/components/course/course-reviews";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { fetchCourseBySlug } from "@/lib/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function CoursePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Get the current authenticated session, if any.
    const session = await getAuthSession();
    const { slug } = await params;

    // Fetch course data by its slug.
    const course = await fetchCourseBySlug(slug);

    // If no course is found, show a "not found" page.
    if (!course) {
        return notFound();
    }

    // Calculate the average rating from the reviews.
    const averageRating =
        course.reviews && course.reviews.length > 0
            ? course.reviews.reduce(
                  (total, review) => total + review.rating,
                  0
              ) / course.reviews.length
            : 0;

    // Initialize enrollment status flags.
    let isEnrolled = false;

    // If there's an active session, check for enrollment.
    if (session) {
        // Determine if the user is already enrolled.
        const enrollment = course.enrollments?.find(
            (enrollment) => enrollment.userId === session.user.id
        );
        isEnrolled = !!enrollment;
    }

    // Only render the page for authenticated users.
    if (session)
        return (
            <>
                {/* Main Grid: Course Thumbnail and Details */}
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Thumbnail Section */}
                    <div>
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                            <div className="flex h-full w-full items-center justify-center bg-muted">
                                {course.thumbnail ? (
                                    <Image
                                        src={
                                            course.thumbnail ||
                                            "/placeholder.svg"
                                        }
                                        alt={
                                            course.thumbnail
                                                ? course.title
                                                : "No thumbnail available"
                                        }
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

                    {/* Course Details Section */}
                    <div className="flex flex-col">
                        {/* Course Category Badge */}
                        {course.category && (
                            <Badge className="w-fit">
                                {course.category.name}
                            </Badge>
                        )}

                        {/* Course Title */}
                        <h1 className="mt-2 text-3xl font-bold">
                            {course.title}
                        </h1>

                        {/* Reviews and Enrollment Info */}
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1 font-medium">
                                    {averageRating
                                        ? averageRating.toFixed(1)
                                        : 0}
                                </span>
                                <span className="ml-1 text-muted-foreground">
                                    {course.reviews?.length
                                        ? `(${course.reviews.length} reviews)`
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

                        {/* Duration, Certificate Info */}
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

                        {/* Faculty Info */}
                        <div className="mt-4 flex items-center gap-2">
                            <CourseFacultyInfoCard
                                faculty={course.faculties?.[0] || null}
                            />
                        </div>

                        {/* Price Section */}
                        <div className="mt-6">
                            <div className="flex items-center gap-2">
                                {course.onSale &&
                                course.discountPrice &&
                                course.price &&
                                course.discountPrice < course.price ? (
                                    <span className="flex items-center gap-2">
                                        <span className="text-3xl font-bold text-green-500">
                                            {formatPrice(
                                                Number(course.discountPrice)
                                            )}
                                        </span>
                                        <span className="text-lg text-muted-foreground line-through">
                                            {formatPrice(Number(course.price))}
                                        </span>
                                    </span>
                                ) : (
                                    <span className="text-3xl font-bold text-green-500">
                                        {formatPrice(
                                            Number(
                                                course.price ? course.price : 0
                                            )
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Select Options for Mode and Attempt */}
                        <div className="mt-4 flex gap-2">
                            <Select>
                                <SelectTrigger className="w-44 lg:min-w-fit">
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {course.availableModes.length ? (
                                            course.availableModes.map(
                                                (mode) => (
                                                    <SelectItem
                                                        key={mode.id}
                                                        value={mode.slug}
                                                    >
                                                        {mode.name}
                                                    </SelectItem>
                                                )
                                            )
                                        ) : (
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
                                        {course.availableAttempts.length ? (
                                            course.availableAttempts.map(
                                                (attempt) => (
                                                    <SelectItem
                                                        key={attempt.id}
                                                        value={attempt.slug}
                                                    >
                                                        {attempt.name}
                                                    </SelectItem>
                                                )
                                            )
                                        ) : (
                                            <SelectItem value="download-link-with-handbook">
                                                June 2024
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Course Add-to-Cart Button */}
                        <div className="mt-4 flex gap-2">
                            <div className="mt-6 w-full">
                                <CourseAddCartButton
                                    courseId={course.id}
                                    attemptId={course.availableAttempts[0].id}
                                    modeId={course.availableModes[0].id}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Course Content Sections */}
                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            <Tabs defaultValue="description" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="description">
                                        Description
                                    </TabsTrigger>
                                    <TabsTrigger value="content-info">
                                        Content Info
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="description">
                                    {/* Course Description */}
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            About this course
                                        </h2>
                                        <div className="mt-4 prose max-w-none">
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="content-info">
                                    {/* Course Content Info */}
                                    <CourseContentInfo
                                        selectedMode={
                                            course.availableModes?.[0]
                                        }
                                        duration={course.durationInMin}
                                        enrollments={course.enrollments}
                                        videoLanguage={course.videoLanguage}
                                        courseMaterialLanguage={
                                            course.courseMaterialLanguage
                                        }
                                    />
                                </TabsContent>
                            </Tabs>

                            {/* Faculty List */}
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

                            {/* Reviews Section */}
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

                            {/* Todo: Add a carousel for related courses */}
                        </div>
                    </div>

                    {/* Sidebar with course summary */}
                    <div>
                        <div className="rounded-lg border p-4 sticky top-25">
                            <h3 className="text-lg font-semibold">
                                This course includes:
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {formatDuration(
                                            course.durationInMin * 60
                                        )}{" "}
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
                        </div>
                    </div>
                </div>
            </>
        );
}
