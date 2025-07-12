import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ResponsiveImage from "@/components/ui/responsive-image";
import FacultyTagCard, {
    FacultyTagCardSkeleton,
} from "@/components/layout/card/faculty-tag-card";
import PriceDisplay from "@/components/course/price-display";
import BuyButton from "@/components/course/buy-button";
import CartButton from "@/components/course/cart-button";
import { excerptByWords } from "@/lib/utils";
import { CourseType } from "@/lib/types";

/**
 * Renders a styled card displaying course details, image, pricing, and action buttons.
 */
export default function CourseCard({ course }: { course: CourseType }) {
    // Destructure necessary course properties
    const {
        id,
        slug,
        title,
        description,
        thumbnail,
        price,
        discountPrice,
        category,
        onSale,
        faculties,
        availableAttempts,
        availableModes,
    } = course;

    // Grab the first faculty if available
    const mainFaculty = faculties?.[0];

    return (
        <Card className="cursor-default rounded-md w-full max-w-sm py-0">
            <Link href={`courses/${slug}`}>
                {/* Course image section with badges */}
                <div className="relative m-2.5 overflow-hidden rounded">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent group-hover:from-foreground/60 via-transparent to-transparent z-10 transition-colors duration-500" />
                    {/* Category badge (top-left corner) */}
                    <div className="absolute top-2 left-2 z-10">
                        <Badge
                            variant="secondary"
                            className="bg-background/80 backdrop-blur-sm text-primary font-medium rounded-full"
                        >
                            {category?.name ?? "No category"}
                        </Badge>
                    </div>

                    {/* On Sale badge (top-right corner) */}
                    {onSale && (
                        <div className="absolute top-2 right-2 z-10">
                            <Badge
                                variant="destructive"
                                className="rounded-full"
                            >
                                On Sale
                            </Badge>
                        </div>
                    )}

                    {/* Thumbnail image of the course */}
                    <ResponsiveImage
                        src={thumbnail!}
                        alt={title}
                        loading="lazy"
                        className="transition-transform duration-500 transform group-hover:scale-110"
                    />
                </div>

                {/* Title and faculty tag */}
                <CardHeader className="py-2">
                    <CardTitle className="text-lg md:text-xl line-clamp-1 mb-1 animate-blink">
                        <h3>{title}</h3>
                    </CardTitle>
                    {/* Display faculty tag if available */}
                    {mainFaculty && <FacultyTagCard faculty={mainFaculty} />}
                </CardHeader>

                {/* Description and price block */}
                <CardContent className="py-2.5">
                    <CardDescription className="line-clamp-3 mb-2 text-pretty">
                        {/* Shortened description */}
                        {excerptByWords({ content: description! })}
                    </CardDescription>

                    {/* Price section */}
                    <div className="flex items-center">
                        <PriceDisplay
                            price={price}
                            discountPrice={discountPrice}
                        />
                    </div>
                </CardContent>
            </Link>
            {/* Action buttons: Add to Cart / Buy Now */}
            <CardFooter className="pb-6 pt-2">
                <div className="flex flex-col md:flex-row flex-1 items-center justify-center gap-2">
                    <CartButton
                        courseId={id}
                        attemptId={availableAttempts?.[0].id}
                        modeId={availableModes?.[0].id}
                    />
                    <BuyButton courseId={id} />
                </div>
            </CardFooter>
        </Card>
    );
}

/**
 * Placeholder skeleton UI for the course card, shown during loading states.
 */
export function CourseCardSkeleton() {
    return (
        <Card className="cursor-default rounded-md gap-2.5 w-full max-w-sm h-full animate-pulse py-0">
            {/* Skeleton for image and badges */}
            <div className="relative m-2.5 overflow-hidden rounded bg-muted">
                <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-full" />
                <Skeleton className="absolute top-2 right-2 h-6 w-14 rounded-full" />
                <Skeleton className="h-40 w-full" />
            </div>

            {/* Skeleton for header: title and faculty */}
            <CardHeader>
                <Skeleton className="h-6 w-32 mb-2" />
                <FacultyTagCardSkeleton />
            </CardHeader>

            {/* Skeleton for description and pricing */}
            <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-11/12 mb-2" />
                <Skeleton className="h-4 w-10/12 mb-4" />
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                </div>
            </CardContent>

            {/* Skeleton for action buttons */}
            <CardFooter className="pb-6">
                <div className="flex gap-2 w-full">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-md" />
                </div>
            </CardFooter>
        </Card>
    );
}
