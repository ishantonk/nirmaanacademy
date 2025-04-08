"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchResult } from "@/components/search/search-result";

export function LiveSearch({ initialQuery = "" }: { initialQuery?: string }) {
    const [query, setQuery] = useState(initialQuery);
    // Debounce the query value for 500ms to reduce API calls on every keystroke.
    const [debouncedQuery] = useDebounce(query, 500);

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        name="search"
                        placeholder="Search courses..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
            <SearchResult query={debouncedQuery} />
        </div>
    );
}
