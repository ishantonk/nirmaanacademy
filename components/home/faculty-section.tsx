import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchFaculties } from "@/lib/fetch";
import { FacultiesCarousel } from "@/components/home/faculties-carousel";

export async function FacultySection() {
    const faculties = await fetchFaculties();

    return (
        <section className="bg-muted/10 pt-12 pb-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl lg:text-3xl font-bold">
                            Our Expert Faculties
                        </h2>
                        <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                            Learn from experienced professionals in business
                            law, corporate governance, and finance law.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/faculty">
                            All Faculties
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                {/* carousel */}
                <FacultiesCarousel faculties={faculties} />
            </div>
        </section>
    );
}
