"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Profile", href: "/profile", icon: User },
];

export function BottomNavBar() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    return (
        (isMobile && (
            <nav className="fixed z-30 bottom-0 left-0 w-full bg-accent/95 backdrop-blur supports-[backdrop-filter]:bg-accent/60 border-t drop-shadow-lg p-2 pb-4 flex justify-around">
                {navItems.map(({ name, href, icon: Icon }) => (
                    <Link
                        key={name}
                        href={href}
                        className="flex flex-col items-center gap-1 flex-1"
                    >
                        <Icon
                            className={cn(
                                "h-5 w-5 transition-all",
                                pathname === href
                                    ? "scale-110 text-primary"
                                    : "text-muted-foreground"
                            )}
                        />
                        <span
                            className={cn(
                                "text-xs transition-colors",
                                pathname === href
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"
                            )}
                        >
                            {name}
                        </span>
                    </Link>
                ))}
            </nav>
        )) || <></>
    );
}
