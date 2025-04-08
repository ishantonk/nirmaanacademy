import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesCarousel } from "@/components/home/categories-carousel";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@/lib/types";

export async function CategoriesSection() {
    const categories = await getCategories();

    return (
        <section className="bg-muted/70 py-2">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Browse Categories
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Find the perfect course by exploring our categories
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/categories">
                            All Categories
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* carousel */}
                <CategoriesCarousel categories={categories} />
            </div>
        </section>
    );
}

async function getCategories(): Promise<CategoryType[]> {
    return await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    courses: {
                        where: {
                            status: "PUBLISHED",
                        },
                    },
                },
            },
        },
        orderBy: {
            courses: {
                _count: "desc",
            },
        },
        take: 8,
    });
}
