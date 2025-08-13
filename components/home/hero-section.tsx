"use client";

import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/home/hero-carousel";
import useIsMobile from "@/hooks/use-mobile";
import { EmptyState } from "@/components/ui/empty-state";
import MaterialRipple from "@/components/ui/material-ripple";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/format";
import { fetchNotices } from "@/lib/services/api";
import { NoticeType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Bell, Notebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/services/api";
import { CategoryType } from "@/lib/types";

export function HeroSection() {
    const isMobile = useIsMobile();
    const isDesktop = !isMobile;

    return (
        <section className="relative w-full overflow-hidden py-4 lg:py-12 bg-gradient-to-t from-muted via-transparent to-transparent">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/bg-hero.jpg" // Update this path with your background image
                    alt="Hero Background"
                    fill
                    className="object-cover object-center brightness-50"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full grid grid-cols-2 lg:grid-cols-4 items-center justify-center max-w-7xl mx-auto gap-4">
                {isDesktop && (
                    <div className="hidden md:flex col-span-1 items-center justify-center">
                        <NoticeCard />
                    </div>
                )}
                <div className="col-span-2 flex items-center justify-center">
                    <HeroCarousel />
                </div>
                {isMobile && (
                    <div className="flex md:hidden col-span-2 w-full items-center justify-center">
                        <NoticeCard />
                    </div>
                )}
                <div className="col-span-2 lg:col-span-1 flex items-center justify-center">
                    <CategoriesTagCard />
                </div>
            </div>
        </section>
    );
}

function NoticeCard({ className }: { className?: string }) {
    const {
        data: notices,
        isLoading,
        isError,
    } = useQuery<NoticeType[]>({
        queryKey: ["notices"],
        queryFn: fetchNotices,
    });

    return (
        <div
            className={cn(
                "w-full h-full bg-background/80 rounded-xl overflow-hidden",
                className
            )}
        >
            <NoticeHeader />
            {isLoading ? (
                <p className="flex items-center justify-center h-72 text-muted">
                    Loading...
                </p>
            ) : isError ? (
                <p className="flex items-center justify-center h-72 text-red-500">
                    Failed to load
                </p>
            ) : notices?.length ? (
                <NoticeList notices={notices} />
            ) : (
                <EmptyState
                    icon={Bell}
                    title="No notices"
                    description="No updates available. Check back later."
                />
            )}
        </div>
    );
}

function NoticeHeader() {
    return (
        <div className="bg-gradient-to-br from-primary to-accent px-4 py-2 space-y-2 rounded-b-lg shadow-2xl">
            <div className="flex flex-row items-center justify-start gap-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/20 backdrop-blur-sm">
                    <Bell className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-xl font-bold">Important Updates</h2>
            </div>
            <p className="text-sm font-light text-muted">
                Stay informed changes and announcements
            </p>
        </div>
    );
}

function NoticeList({ notices }: { notices: NoticeType[] }) {
    return (
        <ScrollArea showShadow className="px-2 h-72">
            <div className="flex flex-col gap-y-2 p-2">
                {notices.map((notice) => (
                    <NoticeItem key={notice.id} notice={notice} />
                ))}
            </div>
        </ScrollArea>
    );
}

function NoticeItem({ notice }: { notice: NoticeType }) {
    return (
        <MaterialRipple>
            <div className="border-l-3 border-s-accent bg-surface p-3 cursor-pointer rounded-md">
                <div className="flex flex-col items-start justify-between">
                    <div className="flex flex-col items-start justify-center gap-y-1.5">
                        <div className="flex flex-row items-center justify-start gap-x-2">
                            <AlertCircle className="w-4 h-4 text-secondary" />
                            <span className="text-xs font-medium text-foreground">
                                {formatDate(notice.createdAt)}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {notice.content}
                        </p>
                    </div>
                </div>
            </div>
        </MaterialRipple>
    );
}

function CategoriesTagCard({ className }: { className?: string }) {
    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery<CategoryType[]>({
        queryKey: ["course-categories"],
        queryFn: () => fetchCategories(3),
    });

    return (
        <div
            className={cn(
                "w-full h-full bg-background/80 rounded-xl overflow-hidden",
                className
            )}
        >
            <CategoriesTagHeader />
            {isLoading ? (
                <div className="flex items-center justify-center h-72">
                    <p className="text-muted">Loading categories...</p>
                </div>
            ) : isError ? (
                <div className="flex items-center justify-center h-72">
                    <p className="text-red-500">Failed to load categories</p>
                </div>
            ) : categories && categories.length > 0 ? (
                <CategoriesTagList categories={categories} />
            ) : (
                <EmptyState
                    icon={Notebook}
                    title="No Categories Available"
                    description="Explore our diverse range of courses and boost your skills."
                />
            )}
        </div>
    );
}

function CategoriesTagHeader() {
    return (
        <div className="bg-gradient-to-br from-primary to-accent px-4 py-2 space-y-2 rounded-b-lg shadow-2xl">
            <div className="flex flex-row items-center justify-start gap-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/20 backdrop-blur-sm">
                    🎓
                </div>
                <h2 className="text-xl font-bold">Courses</h2>
            </div>
            <p className="text-sm text-muted">
                Boost your skills with top courses.
            </p>
        </div>
    );
}

function CategoriesTagList({ categories }: { categories: CategoryType[] }) {
    return (
        <div className="grid grid-cols-1 gap-2 p-2 px-2 h-72">
            <Button asChild className="w-full rounded-full p-6">
                <Link href="/courses">View All Courses</Link>
            </Button>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

function CategoryItem({ category }: { category: CategoryType }) {
    return (
        <Button
            key={category.id}
            asChild
            variant="outline"
            className="w-full rounded-full p-6 hover:bg-primary/10"
        >
            <Link href={`/courses?category=${category.slug}`}>
                {category.name}
            </Link>
        </Button>
    );
}
