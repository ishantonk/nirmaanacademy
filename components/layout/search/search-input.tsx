"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchInput({
    className,
    type = "search",
    "aria-label": ariaLabel = "Search Input",
    ...props
}: React.ComponentProps<"input">) {
    const searchParams = useSearchParams();
    const searchFromUrl = searchParams.get("search") || "";

    const [search, setSearch] = useState(searchFromUrl);
    const [debouncedSearch] = useDebounce(search, 500);

    useEffect(() => {
        if (searchFromUrl !== search) {
            setSearch(searchFromUrl);
        }
    }, [searchFromUrl, search]);

    // Build query parameters based on the current URL and debounced input.
    const params = new URLSearchParams();
    if (debouncedSearch) params.append("search", debouncedSearch);

    return (
        <div className={cn("relative w-full")}>
            <Input
                type={type}
                aria-label={ariaLabel}
                className={cn("w-full pl-10", className)}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                {...props}
            />
            <Search className="absolute left-2 bottom-1/2 translate-y-1/2 text-muted-foreground" />
        </div>
    );
}
