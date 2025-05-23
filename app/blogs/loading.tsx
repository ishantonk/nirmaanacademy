import { BlogGrid } from "@/components/blog/blog-grid";
import { PostCardSkeleton } from "@/components/blog/post-card-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Our Blog</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Stay updated with the latest insights, tutorials, and news
                    in Business Law, Company Law, and more.
                </p>
            </div>
            <BlogGrid
                blogs={Array.from({ length: 3 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            />
        </div>
    );
}
