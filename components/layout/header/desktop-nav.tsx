"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

// Define the interface for navigation items.
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

/**
 * DesktopNav Component
 *
 * Renders a header navigation menu:
 * - For items without subItems, a standard link is displayed.
 * - For items with subItems, a dropdown is created using native <details> and <summary> elements.
 */
export function DesktopNav({ items }: { items: NavItems[] }) {
    const pathname = usePathname();

    return (
        <nav className="bg-primary/65">
            <div className="hidden md:flex items-center justify-center">
                {/* The navigation list (centered horizontally) */}
                <div className="flex items-center justify-center max-w-7xl">
                    {items.map((item) => {
                        if (item.subItems && item.subItems.length > 0) {
                            // If the item has sub-items, use <details> for a dropdown effect.
                            return (
                                <DropdownMenu key={item.title}>
                                    <DropdownMenuTrigger className="flex flex-row focus:outline-none group">
                                        <ListItem item={item} isTrigger />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="grid grid-cols-2 gap-2 bg-primary/60 backdrop-blur supports-[backdrop-filter]:bg-primary/60 shadow-lg border-none">
                                        {item.subItems.map((sub, i) => (
                                            <Link
                                                key={sub.href + i}
                                                href={sub.href}
                                            >
                                                <ListItem
                                                    item={sub}
                                                    pathname={sub.href}
                                                    isSubItem
                                                />
                                            </Link>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        } else {
                            // Render a simple navigation link for items without sub-items.
                            return (
                                <Link key={item.title} href={item.href}>
                                    <ListItem
                                        key={item.href}
                                        item={item}
                                        pathname={pathname}
                                    />
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </nav>
    );
}

interface ListItemProps {
    item: {
        title: string;
        href: string;
        icon?: React.ElementType;
        description?: string;
    };
    pathname?: string;
    isSubItem?: boolean;
    isTrigger?: boolean;
}

function ListItem({
    item,
    pathname,
    isSubItem = false,
    isTrigger = false,
}: ListItemProps) {
    const itemClass =
        "p-2 text-sm transition-colors hover:text-white [&_svg:not([class*='size-'])]:size-4 gap-2 justify-center";
    const subItemClass =
        "rounded p-4 gap-x-4 justify-start hover:bg-primary/70 h-full w-full text-base [&_svg:not([class*='size-'])]:size-14";
    const iconItemClass = "group-hover:text-white";
    const iconSubItemClass = "bg-background/70 p-4 rounded";
    return (
        <div
            className={cn(
                "relative flex flex-row items-center cursor-pointer font-medium group-data-[state=open]:text-white transition-colors duration-200",
                item.icon && "group",
                isSubItem ? subItemClass : itemClass,
                pathname === item.href ? "text-white" : "text-neutral-300"
            )}
        >
            {item.icon && (
                <item.icon
                    className={cn(
                        "group-data-[state=open]:text-white",
                        isSubItem ? iconSubItemClass : iconItemClass,
                        pathname === item.href
                            ? "text-white"
                            : "text-neutral-300"
                    )}
                />
            )}
            <div className="flex flex-col">
                {item.title}
                {isSubItem && (
                    <span className="text-xs text-neutral-200 line-clamp-2 max-w-48">
                        {item.description}
                    </span>
                )}
            </div>
            {isTrigger && (
                <ChevronDownIcon
                    className={cn(
                        "relative top-[1px] size-4 transition duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-white",
                        pathname === item.href
                            ? "text-white"
                            : "text-neutral-300"
                    )}
                    aria-hidden="true"
                />
            )}
            {!isSubItem && (
                <div
                    className={cn(
                        "absolute inset-x-full bottom-0 h-[3px] rounded-full bg-white transition-all ease-in-out duration-300 group-hover:inset-x-0 group-data-[state=open]:inset-x-0",
                        pathname === item.href ? "inset-x-0" : "inset-x-full"
                    )}
                />
            )}
        </div>
    );
}
