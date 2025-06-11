import { fetchCourses } from "@/lib/services/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export function ResultWidget() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("search") ?? "";

    // only fetch when there's something to look up
    const { data, error, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => fetchCourses(query),
        enabled: !!query,
    });

    // hide entirely if there's no query
    if (!query) return null;

    return (
        <div className="absolute inset-x-0 z-10 -bottom-10 border border-surface rounded-md max-h-[400px] bg-surface/60 flex flex-col items-center justify-center backdrop-blur-md shadow-lg">
            {isLoading && <ResultWidgetSkeleton />}
            {error && (
                <div className="p-4 text-sm text-foreground/70">
                    Something went wrong.{" "}
                    <button
                        className="underline"
                        onClick={() => router.refresh()}
                    >
                        Try again
                    </button>
                </div>
            )}
            {!isLoading && data && data.length === 0 && (
                <div className="p-4 text-sm text-foreground/60">
                    No results for “{query}”
                </div>
            )}
            {!isLoading && data && data.length > 0 && (
                <ul className="divide-y divide-border">
                    {data.map((item: { id: string; title: string }) => (
                        <li
                            key={item.id}
                            className="p-3 hover:bg-accent/10 cursor-pointer"
                            onClick={() => router.push(`/items/${item.id}`)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function ResultWidgetSkeleton() {
    return (
        <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 w-full rounded bg-muted animate-pulse"
                />
            ))}
        </div>
    );
}

export default { ResultWidget, ResultWidgetSkeleton };
