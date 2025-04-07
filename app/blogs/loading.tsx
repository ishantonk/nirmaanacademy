import { BlogGrid } from "@/components/blog/blog-grid";
import { PostCardSkeleton } from "@/components/blog/post-card-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Our Blog</h1>
                <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                    Stay updated with the latest insights, tutorials, and news
                    in Business Law, Company Law, and more.
                </p>
            </div>
            <BlogGrid
                blogs={Array.from({ length: 6 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            />
        </div>
    );
}
