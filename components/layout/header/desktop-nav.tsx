"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItems {
    title: string;
    href: string;
    icon?: React.ElementType;
    description?: string;
}

export function DesktopNav({ items }: { items: NavItems[] }) {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex container items-center justify-between py-2 border-t border-primary/10">
            <nav className="flex gap-6 w-full justify-center">
                {items?.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                            "flex items-center text-sm font-medium transition-colors hover:text-primary",
                            pathname === item.href
                                ? "text-primary"
                                : "text-muted-foreground",
                            item.icon && "group"
                        )}
                    >
                        {item.icon && (
                            <item.icon
                                className={cn(
                                    pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground",
                                    "w-4 h-4 mr-2 group-hover:text-primary"
                                )}
                            />
                        )}
                        {item.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
