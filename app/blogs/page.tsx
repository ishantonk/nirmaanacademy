import { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { BlogGrid } from "@/components/blog/blog-grid";
import SiteInfo from "@/data/contact-info";
import { BlogPostType } from "@/lib/types";
import { fetchBlogs } from "@/lib/services/api";

export const metadata: Metadata = {
    title: "Blog | " + SiteInfo.Title,
    description:
        "Latest articles, tutorials, and updates from Nirmaan Academy.",
};

export default async function BlogsPage() {
    const posts = await fetchBlogs();

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
                blogs={posts.map((post: BlogPostType) => (
                    <PostCard key={post.id} {...post} />
                ))}
            />
        </div>
    );
}
