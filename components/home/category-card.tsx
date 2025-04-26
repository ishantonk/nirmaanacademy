import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { CategoryType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({
    category,
    courseCount,
    color,
}: {
    category: CategoryType;
    courseCount: number;
    color?: string;
}) {
    const iconColor =
        color === "bg-blue-800/10"
            ? "text-blue-500"
            : color === "bg-green-800/10"
            ? "text-green-500"
            : color === "bg-yellow-800/10"
            ? "text-yellow-500"
            : "text-red-500";
    const iconBgColor =
        color === "bg-blue-800/10"
            ? "bg-blue-500/20"
            : color === "bg-green-800/10"
            ? "bg-green-500/20"
            : color === "bg-yellow-800/10"
            ? "bg-yellow-500/20"
            : "bg-red-500/20";
    return (
        <Link href={`/courses?category=${category.slug}`}>
            <Card
                className={cn(
                    "overflow-hidden transition-all hover:shadow-md h-full",
                    color
                )}
            >
                <CardContent className="px-4 lg:px-6 space-y-4">
                    <div
                        className={cn(
                            "mb-4 h-12 w-12 rounded-full flex items-center justify-center",
                            iconBgColor
                        )}
                    >
                        <BookOpen className={cn("h-6 w-6", iconColor)} />
                    </div>
                    <CardTitle
                        className={cn("text-lg font-semibold", iconColor)}
                    >
                        <h3>{category.name}</h3>
                    </CardTitle>
                    <CardDescription className="">
                        {category.description && category.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="px-4 lg:px-6">
                    <div className="text-lg font-semibold drop-shadow-2xl">
                        {courseCount} {courseCount === 1 ? "course" : "courses"}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
