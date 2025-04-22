"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    BookOpen,
    FileChartLine,
    GraduationCap,
    Home,
    LifeBuoy,
    MessageSquareWarning,
    Newspaper,
    NotebookPen,
    Search,
    ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "@/components/layout/header/desktop-nav";
import { MobileNav } from "@/components/layout/header/mobile-nav";
import { UserNav } from "@/components/layout/header/user-nav";
import { ToggleTheme } from "@/components/theme/toggle-theme";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
    // State to track whether the user has scrolled
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Radix gives the viewport a data attribute by default:
        const viewport = document.querySelector<HTMLElement>(
            "[data-radix-scroll-area-viewport]"
        );
        if (!viewport) return;

        const onScroll = () => setIsScrolled(viewport.scrollTop > 0);
        viewport.addEventListener("scroll", onScroll);
        return () => viewport.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
                isScrolled && "drop-shadow-sm"
            )}
        >
            <div className="bg-background/60">
                <div className="mx-auto px-4 max-w-7xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {
                            /* Mobile menu */
                            isMobile && <MobileNav items={navItems} />
                        }
                        <Logo
                            size={isMobile ? "sm" : isScrolled ? "sm" : "md"}
                        />
                    </div>
                    {!isMobile && (
                        <div className="hidden md:flex flex-1 items-center justify-center space-x-4">
                            <div className="relative w-10/12">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    name="search"
                                    placeholder="Search courses..."
                                    className="pl-10 border border-neutral-300"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex items-center justify-end space-x-4">
                        <Link href="/cart">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Shopping Cart</span>
                            </Button>
                        </Link>
                        {!isMobile && <ToggleTheme /> /* Dark Mode Toggle */}
                        <UserNav /> {/* User Navigation */}
                    </div>
                </div>
            </div>

            {
                /* Navigation for desktop */
                !isMobile && <DesktopNav items={navItems} />
            }
        </header>
    );
}

interface NavItems {
    title: string;
    href: string;
    icon?: React.ElementType;
    description?: string;
    subItems?: Array<{
        title: string;
        href: string;
        icon?: React.ElementType;
        description?: string;
    }>;
}

const navItems: NavItems[] = [
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
            },
            {
                title: "Class 11th",
                href: "/courses",
                icon: BookOpen,
            },
            {
                title: "Class 12th",
                href: "/courses",
                icon: BookOpen,
            },
            {
                title: "Class 10th",
                href: "/courses",
                icon: BookOpen,
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
