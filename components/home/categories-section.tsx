import SectionHeading from "@/components/home/section-heading";
import { fetchCategories } from "@/lib/services/api";
import { EmptyState } from "../ui/empty-state";
import { ChevronRight, Notebook } from "lucide-react";
import SectionCarousel from "./section-carousel";
import { CategoryType } from "@/lib/types";

// Predefined color classes for better performance
const CATEGORY_COLORS = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
] as const;

export async function CategoriesSection() {
    const categories = await fetchCategories(8);

    if (categories.length === 0) {
        return (
            <section className="bg-gradient-to-t from-background via-background to-muted pt-12 pb-8">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        title="Discover Your Next Passion"
                        description="Explore our diverse categories to find the perfect course for you."
                        buttonLink={{
                            label: "View All Courses",
                            link: "/courses",
                        }}
                    />
                    <EmptyState
                        icon={Notebook}
                        title="No category found"
                        description="Try adjusting your search or filter to find what you're looking for."
                    />
                </div>
            </section>
        );
    }

    // Pre-compute category items to avoid inline computation
    const categoryItems = categories.map((category, idx) => (
        <CategoryCard
            key={category.id || idx} // Use category.id if available for better keys
            category={category}
            courseCount={category._count?.courses ?? 0}
            color={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}
        />
    ));

    return (
        <section className="bg-gradient-to-t from-background via-background to-muted pt-12 pb-8">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Discover Your Next Passion"
                    description="Explore our diverse categories to find the perfect course for you."
                    buttonLink={{
                        label: "View All Courses",
                        link: "/courses",
                    }}
                />
                <SectionCarousel autoplay items={categoryItems} />
            </div>
        </section>
    );
}

interface CategoryCardProps {
    category: CategoryType;
    courseCount: number;
    color?: string;
}

function CategoryCard({
    category,
    courseCount,
    color = "from-purple-500 to-pink-500",
}: CategoryCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 border border-gray-100 cursor-pointer">
            {/* Gradient Background */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            ></div>

            {/* Floating Orb */}
            <div
                className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110`}
            ></div>

            {/* Content */}
            <div className="relative p-6 space-y-4">
                {/* Header with course count badge */}
                <div className="flex flex-col md:flex-row gap-y-2 items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200 line-clamp-2">
                            {category.name}
                        </h3>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white text-sm font-semibold shadow-lg`}
                    >
                        {courseCount} courses
                    </div>
                </div>

                {/* Description with line clamp */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-200 text-wrap">
                    {category.description}
                </p>

                {/* Action area */}
                <div className="pt-2">
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                        <span
                            className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                        >
                            Explore courses
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>

            {/* Hover glow effect */}
            <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
            ></div>
        </div>
    );
}
