"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

export function DesktopNav({ items }: { items: NavItems[] }) {
    const pathname = usePathname();

    return (
        <div className="bg-primary/65">
            <div className="mx-auto px-4 max-w-7xl hidden md:flex container items-center justify-between py-2">
                <nav className="flex gap-6 w-full justify-center">
                    {items?.map((item) => {
                        // Check if item has sub-items.
                        if (item.subItems && item.subItems.length > 0) {
                            return (
                                <DropdownMenu key={item.title}>
                                    <DropdownMenuTrigger asChild>
                                        <button
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
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-48">
                                        {item.subItems.map((sub) => (
                                            <DropdownMenuItem
                                                key={sub.title}
                                                className="cursor-pointer"
                                            >
                                                <Link
                                                    href={sub.href}
                                                    className="flex items-center w-full"
                                                >
                                                    {sub.icon && (
                                                        <sub.icon className="w-4 h-4 mr-2" />
                                                    )}
                                                    {sub.title}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        } else {
                            return (
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
                            );
                        }
                    })}
                </nav>
            </div>
        </div>
    );
}
