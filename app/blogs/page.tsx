import { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { BlogGrid } from "@/components/blog/blog-grid";
import { brandName } from "@/data/contact-info";
import { BlogPostType } from "@/lib/types";

export const metadata: Metadata = {
    title: "Blog | " + brandName,
    description:
        "Latest articles, tutorials, and updates from Nirmaan Academy.",
};

async function getBlogPosts(): Promise<BlogPostType[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/blogs");
    if (response.ok) {
        const posts: BlogPostType[] = await response.json();
        return posts;
    }
    return [];
}

export default async function BlogsPage() {
    const posts = await getBlogPosts();

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
