import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CategoryType } from "@/lib/types";

export function CategoryCard({
    category,
    courseCount,
    color,
}: {
    category: CategoryType;
    courseCount: number;
    color?: string;
}) {
    return (
        <Link href={`/categories/${category.slug}`}>
            <Card className={"overflow-hidden transition-all hover:shadow-md h-full bg-amber-200" + " " + color}>
                <CardContent className="p-6">
                    <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                        {category.name}
                    </h3>
                    {category.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {category.description}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground">
                        {courseCount} {courseCount === 1 ? "course" : "courses"}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
