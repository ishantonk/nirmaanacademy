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
        <div className="bg-primary/65">
            <div className="mx-auto px-4 max-w-7xl hidden md:flex container items-center justify-between py-2">
                <nav className="flex gap-6 w-full justify-center">
                    {items?.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "flex items-center text-sm font-medium transition-colors hover:text-white",
                                pathname === item.href
                                    ? "text-white"
                                    : "text-neutral-300",
                                item.icon && "group"
                            )}
                        >
                            {item.icon && (
                                <item.icon
                                    className={cn(
                                        pathname === item.href
                                            ? "text-white"
                                            : "text-neutral-300",
                                        "w-4 h-4 mr-2 group-hover:text-muted"
                                    )}
                                />
                            )}
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
