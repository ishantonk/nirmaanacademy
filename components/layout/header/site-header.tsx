"use client";

import {
    BadgeHelp,
    BookOpen,
    ChevronDownIcon,
    FileChartLine,
    GraduationCap,
    Home,
    LifeBuoy,
    MessageSquareWarning,
    Newspaper,
    NotebookPen,
    ShoppingCart,
} from "lucide-react";
import Logo from "@/components/ui/logo";
import SearchInput from "@/components/layout/search/search-input";
import useIsMobile from "@/hooks/use-mobile";
import useScrolled from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCategories } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "@/lib/types";
import { Suspense, useEffect, useState } from "react";
import { UserAction } from "./user-action";
import ToggleTheme from "@/components/theme/toggle-theme";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export default function SiteHeader() {
    const isScrolled = useScrolled();
    const [items, setItems] = useState(initialNavItems);

    const { data: categories } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    // Add categories dynamically if needed
    useEffect(() => {
        if (categories) {
            setItems((prev) => {
                return prev.map((item) => {
                    if (item.title === "Video Courses") {
                        return {
                            ...item,
                            subItems: [
                                ...(item.subItems || []),
                                ...categories.map((category) => ({
                                    title: category.name,
                                    href: `/courses?category=${category.slug}`,
                                    icon: BookOpen,
                                    description: category.description || "",
                                })),
                            ],
                        };
                    }
                    return item;
                });
            });
        }
    }, [categories]);

    return (
        <header
            className={cn(
                "sticky top-0 flex flex-col justify-center items-center z-50 bg-transparent transition-all",
                isScrolled ? "drop-shadow-sm backdrop-blur-2xl" : ""
            )}
        >
            <MainHeader items={items} />
            <NavHeader items={items} />
        </header>
    );
}

interface HeaderProps {
    items?: {
        title: string;
        href: string;
        icon?: React.ElementType;
        description?: string;
        subItems?: {
            title: string;
            href: string;
            icon?: React.ElementType;
            description?: string;
        }[];
    }[];
}

function MainHeader({ items = initialNavItems }: HeaderProps) {
    const isMobile = useIsMobile();
    const isScrolled = useScrolled();

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center w-full",
                isScrolled ? "bg-surface/60" : "bg-surface"
            )}
        >
            <div className="container max-w-7xl grid grid-cols-7 items-center gap-x-2 px-2 md:px-0">
                {/* Logo */}
                <div className="col-span-2 flex items-center justify-start">
                    {isMobile && <MobileNav items={items} />}
                    <Logo
                        size={isMobile ? "sm" : isScrolled ? "sm" : "lg"}
                        label={isMobile ? false : true}
                    />
                </div>

                {/* Search */}
                <div className="relative col-span-3">
                    {!isMobile && (
                        <Suspense fallback={<div className="h-10" />}>
                            <SearchInput className="bg-primary/10 border-surface/30" />
                        </Suspense>
                    )}
                </div>

                <div className="col-span-2 flex flex-row items-center justify-end gap-x-2">
                    <Link href="/cart">
                        <Button variant="ghost" className="relative">
                            <ShoppingCart className="size-4" />
                        </Button>
                    </Link>
                    <ToggleTheme />
                    <UserAction />
                </div>
            </div>
        </div>
    );
}

function NavHeader({ items = initialNavItems }: HeaderProps) {
    const isMobile = useIsMobile();
    const isScrolled = useScrolled();

    return !isMobile ? (
        <nav
            className={cn(
                "flex flex-col items-center justify-center w-full",
                isScrolled ? "bg-primary/60" : "bg-primary"
            )}
        >
            <menu className="container max-w-7xl flex flex-row justify-center items-center gap-x-2">
                {items.map((item) =>
                    item.subItems ? (
                        <DropdownMenu key={item.title}>
                            <DropdownMenuTrigger className="flex flex-row focus:outline-none group">
                                <NavItem item={item} isTrigger />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="grid grid-cols-2 gap-2 bg-primary/60 backdrop-blur supports-[backdrop-filter]:bg-primary/60 shadow-lg border-none">
                                {item.subItems.map((sub, i) => (
                                    <Link key={sub.href + i} href={sub.href}>
                                        <NavItem item={sub} isSubItem />
                                    </Link>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={item.href} key={item.title}>
                            <NavItem item={item} />
                        </Link>
                    )
                )}
            </menu>
        </nav>
    ) : null;
}

interface NavItemProps {
    item: {
        title: string;
        href: string;
        icon?: React.ElementType;
        description?: string;
    };
    isSubItem?: boolean;
    isTrigger?: boolean;
}

function NavItem({ item, isSubItem, isTrigger }: NavItemProps) {
    const pathname = usePathname();

    const iconItemClass = "size-4 stroke-2";
    const iconSubItemClass = "size-14 bg-background/40 p-4 rounded";
    return (
        <div
            className={cn(
                "relative flex flex-row justify-center items-center gap-x-1 cursor-pointer  hover:text-accent transition-colors font-medium text-sm p-2 py-1.5 group",
                pathname === item.href ? "text-accent" : "text-surface",
                isSubItem ? "rounded hover:bg-primary/30 justify-start" : ""
            )}
        >
            {item.icon && (
                <item.icon
                    className={cn(
                        "group-data-[state=open]:text-accent",
                        isSubItem ? iconSubItemClass : iconItemClass
                    )}
                />
            )}
            {/* Display title and description for sub-items */}
            <div
                className={cn(
                    "flex flex-col gap-y-0.5",
                    isSubItem ? "px-2" : ""
                )}
            >
                <span className="text-sm font-semibold">{item.title}</span>
                {isSubItem && (
                    <span className="text-xs text-surface/70 group-hover:text-surface/90 line-clamp-1 max-w-[200px]">
                        {item.description}
                    </span>
                )}
            </div>
            {!isSubItem && (
                <div
                    className={cn(
                        "absolute inset-x-full bottom-0 h-[3px] rounded-full transition-all ease-in-out duration-300 group-hover:inset-x-0 group-data-[state=open]:inset-x-0 bg-accent",
                        pathname === item.href ? "inset-x-0" : "inset-x-full"
                    )}
                />
            )}
            {isTrigger && (
                <ChevronDownIcon
                    className={cn(
                        "relative top-0 size-4 transition-transform group-data-[state=open]:rotate-180 group-data-[state=open]:text-foreground"
                    )}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

const initialNavItems = [
    {
        title: "Home",
        href: "/",
        icon: Home,
    },
    {
        title: "Video Courses",
        href: "/courses",
        icon: BookOpen,
        subItems: [
            {
                title: "View All Courses",
                href: "/courses",
                icon: BookOpen,
                description: "Explore all available courses",
            },
        ],
    },
    {
        title: "Free PDF",
        href: "#",
        icon: FileChartLine,
    },
    {
        title: "Test Series",
        href: "#",
        icon: NotebookPen,
    },
    {
        title: "Faculties",
        href: "/faculty",
        icon: GraduationCap,
    },
    {
        title: "Blog",
        href: "/blogs",
        icon: Newspaper,
    },
    {
        title: "FAQs",
        href: "/faq",
        icon: BadgeHelp,
    },
    {
        title: "About",
        href: "/about",
        icon: MessageSquareWarning,
    },
    {
        title: "Contact",
        href: "/contact",
        icon: LifeBuoy,
    },
];
