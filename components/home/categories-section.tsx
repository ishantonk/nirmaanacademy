import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesCarousel } from "@/components/home/categories-carousel";
import { fetchCategories } from "@/lib/fetch";

export async function CategoriesSection() {
    const categories = await fetchCategories(8);

    return (
        <section className="bg-muted/70 pt-12 pb-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl lg:text-3xl font-bold">
                            Browse Categories
                        </h2>
                        <p className="text-sm lg:text-base mt-2 text-muted-foreground">
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
