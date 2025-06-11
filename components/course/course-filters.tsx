"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useIsMobile from "@/hooks/use-mobile";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryType } from "@/lib/types";

export function CourseFilters({ categories }: { categories: CategoryType[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();

    // Get current filter values
    const currentCategory = searchParams.get("category") || "";
    const currentPrice = searchParams.get("price") || "";
    const currentSort = searchParams.get("sort") || "";
    const currentSearch = searchParams.get("search") || "";

    // Create a new URLSearchParams instance
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );

    // Handle category change
    const handleCategoryChange = (value: string) => {
        router.push(`/courses?${createQueryString("category", value)}`);
    };

    // Handle price change
    const handlePriceChange = (value: string) => {
        router.push(`/courses?${createQueryString("price", value)}`);
    };

    // Handle sort change
    const handleSortChange = (value: string) => {
        router.push(`/courses?${createQueryString("sort", value)}`);
    };

    // Handle reset filters
    const handleResetFilters = () => {
        router.push("/courses");
    };

    return !isMobile ? (
        <Card>
            <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your course search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Categories */}
                <CategoriesFilter
                    categories={categories}
                    currentCategory={currentCategory}
                    handleCategoryChange={handleCategoryChange}
                />

                <Separator />

                {/* Price */}
                <PriceFilter
                    currentPrice={currentPrice}
                    handlePriceChange={handlePriceChange}
                />

                <Separator />

                {/* Sort */}
                <SortFilter
                    currentSort={currentSort}
                    handleSortChange={handleSortChange}
                />

                {/* Reset Filters */}
                {(currentCategory ||
                    currentPrice ||
                    currentSort ||
                    currentSearch) && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                )}
            </CardContent>
        </Card>
    ) : (
        <div className="flex items-center justify-end">
            <MobileFilters
                categories={categories}
                currentCategory={currentCategory}
                handleCategoryChange={handleCategoryChange}
                handleResetFilters={handleResetFilters}
                currentPrice={currentPrice}
                handlePriceChange={handlePriceChange}
                currentSort={currentSort}
                handleSortChange={handleSortChange}
            />
        </div>
    );
}

interface MobileFiltersProps {
    categories: CategoryType[];
    currentCategory: string;
    handleCategoryChange: (value: string) => void;
    handleResetFilters: () => void;
    currentPrice: string;
    handlePriceChange: (value: string) => void;
    currentSort: string;
    handleSortChange: (value: string) => void;
    currentSearch?: string;
}

function MobileFilters({
    categories,
    handleCategoryChange,
    currentCategory,
    currentPrice,
    handlePriceChange,
    currentSort,
    handleSortChange,
    handleResetFilters,
    currentSearch,
}: MobileFiltersProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Filter />
                    Apply Filters
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col h-(100vh-4rem)">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                        Refine your course search
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full overflow-y-auto px-4">
                        <div className="flex flex-col space-y-6">
                            {/* Categories */}
                            <CategoriesFilter
                                categories={categories}
                                currentCategory={currentCategory}
                                handleCategoryChange={handleCategoryChange}
                            />

                            <Separator />

                            {/* Price */}

                            <PriceFilter
                                currentPrice={currentPrice}
                                handlePriceChange={handlePriceChange}
                            />

                            <Separator />
                            {/* Sort */}

                            <SortFilter
                                currentSort={currentSort}
                                handleSortChange={handleSortChange}
                            />
                        </div>
                    </ScrollArea>
                </div>

                {/* Reset Filters */}
                <SheetFooter className="border-t pt-4">
                    <SheetClose asChild>
                        <Button
                            disabled={
                                currentCategory ||
                                currentPrice ||
                                currentSort ||
                                currentSearch
                                    ? false
                                    : true
                            }
                            variant="outline"
                            onClick={handleResetFilters}
                        >
                            Reset Filters
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

interface CategoriesFilterProps {
    categories: { id: string; slug: string; name: string }[];
    currentCategory: string;
    handleCategoryChange: (value: string) => void;
}

function CategoriesFilter({
    categories,
    currentCategory,
    handleCategoryChange,
}: CategoriesFilterProps) {
    return (
        <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <RadioGroup
                value={currentCategory}
                onValueChange={handleCategoryChange}
                className="space-y-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="category-all" />
                    <Label htmlFor="category-all">All Categories</Label>
                </div>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center space-x-2"
                    >
                        <RadioGroupItem
                            value={category.slug}
                            id={`category-${category.slug}`}
                        />
                        <Label htmlFor={`category-${category.slug}`}>
                            {category.name}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

interface PriceFilterProps {
    currentPrice: string;
    handlePriceChange: (value: string) => void;
}

function PriceFilter({ currentPrice, handlePriceChange }: PriceFilterProps) {
    return (
        <div>
            <h3 className="font-medium mb-3">Price</h3>
            <RadioGroup
                value={currentPrice}
                onValueChange={handlePriceChange}
                className="space-y-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="price-all" />
                    <Label htmlFor="price-all">All Prices</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="price-free" />
                    <Label htmlFor="price-free">Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paid" id="price-paid" />
                    <Label htmlFor="price-paid">Paid</Label>
                </div>
            </RadioGroup>
        </div>
    );
}

interface SortFilterProps {
    currentSort: string;
    handleSortChange: (value: string) => void;
}

function SortFilter({ currentSort, handleSortChange }: SortFilterProps) {
    return (
        <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <RadioGroup
                value={currentSort}
                onValueChange={handleSortChange}
                className="space-y-2"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="sort-default" />
                    <Label htmlFor="sort-default">Newest</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-asc" id="sort-price-asc" />
                    <Label htmlFor="sort-price-asc">Price: Low to High</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="price-desc" id="sort-price-desc" />
                    <Label htmlFor="sort-price-desc">Price: High to Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="title-asc" id="sort-title-asc" />
                    <Label htmlFor="sort-title-asc">Title: A-Z</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="title-desc" id="sort-title-desc" />
                    <Label htmlFor="sort-title-desc">Title: Z-A</Label>
                </div>
            </RadioGroup>
        </div>
    );
}
