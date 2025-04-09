import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseFacultyInfoCard } from "./course-faculty-info-card";
import { isValidUrl, serializeDecimal } from "@/lib/utils";
import { CourseType } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { CourseAddCartButton } from "./course-add-cart";
import { getAuthSession } from "@/lib/auth";

interface CourseCardProps {
    course: CourseType;
    href: string;
    actions?: React.ReactNode;
    color?: string;
}

export async function CourseCard({ course, href, color }: CourseCardProps) {
    // const session = await getAuthSession();
    // Serialize the price and discountPrice to a number
    const price = serializeDecimal(course.price ?? null);
    const discountPrice = serializeDecimal(course.discountPrice ?? null);
    // Check if the course has a thumbnail URL
    const thumbnail = isValidUrl(course.thumbnail ?? "")
        ? course.thumbnail
        : null;

    // Check if user has this course in cart
    let isInCart = false;

    /*if (session) {
        const cartItem = course.cartItems?.find(
            (cartItem) =>
                cartItem.userId === session.user.id &&
                cartItem.courseId === course.id
        );

        isInCart = !!cartItem;
    }*/

    return (
        <Card
            className={"group relative overflow-hidden p-0 pb-4" + " " + color}
        >
            <Link href={href} className="block">
                <div className="relative aspect-video overflow-hidden">
                    {course.onSale && (
                        <Badge
                            variant="destructive"
                            className="absolute z-10 top-2 right-2 opacity-65"
                        >
                            On Sale
                        </Badge>
                    )}
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                            <span className="text-muted-foreground">
                                No thumbnail
                            </span>
                        </div>
                    )}
                </div>
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
                            <span className="text-xs text-red-500 line-through">
                                {formatPrice(price)}
                            </span>
                            <span className="font-semibold text-sm ml-auto text-green-500">
                                {formatPrice(discountPrice)}
                            </span>
                        </span>
                    ) : (
                        <span className="font-semibold text-sm ml-auto text-green-500">
                            {formatPrice(price ? price : 0)}
                        </span>
                    )}
                </div>
                <Link href={href} className="block">
                    <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary">
                        {course.title}
                    </h3>
                </Link>
            </CardHeader>

            <CardContent>
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

            <CardFooter className="flex justify-end gap-2 mt-auto">
                <CourseAddCartButton courseId={course.id} isInCart={isInCart} />
            </CardFooter>
        </Card>
    );
}
