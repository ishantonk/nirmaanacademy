import { JSX } from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export function BlogGrid({ blogs }: { blogs: JSX.Element[] }) {
    if (blogs.length === 0) {
        return (
            <EmptyState
                icon={Newspaper}
                title="No blogs found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={
                    <Button asChild>
                        <Link href="/blogs">Clear Filters</Link>
                    </Button>
                }
            />
        );
    }
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{blogs}</div>
    );
}
