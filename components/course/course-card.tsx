import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, isValidUrl, serializeDecimal } from "@/lib/utils";
import { CourseType } from "@/lib/types";

interface CourseCardProps {
    course: CourseType;
    href: string;
    actions?: React.ReactNode;
}

export function CourseCard({ course, href, actions }: CourseCardProps) {
    // Serialize the price and discountPrice to a number
    const price = serializeDecimal(course.price ?? null);
    const discountPrice = serializeDecimal(course.discountPrice ?? null);
    // Check if the course has a thumbnail URL
    const thumbnail = isValidUrl(course.thumbnail ?? "")
        ? course.thumbnail
        : null;

    return (
        <Card className="group relative overflow-hidden p-0 pb-4">
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
                <div className="flex items-center col-span-2">
                    {course.category.name && (
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
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={course.faculties?.[0].image || undefined}
                        />
                        <AvatarFallback>
                            {course.faculties?.[0].name
                                ? getInitials(course.faculties?.[0].name)
                                : "NA"}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                        {course.faculties?.[0].name || "NA"}
                    </span>
                </div>
                {course.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                    </p>
                )}
            </CardContent>

            {actions && (
                <CardFooter className="flex justify-end gap-2 mt-auto">
                    {actions}
                </CardFooter>
            )}
        </Card>
    );
}
