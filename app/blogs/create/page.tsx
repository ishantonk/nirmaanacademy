import { Metadata } from "next";
import { BlogCreate } from "@/components/blog/blog-create";
import { brandName } from "@/data/contact-info";
import { BlogMyList } from "@/components/blog/blog-my-list";

export const metadata: Metadata = {
    title: `Create Blog | ${brandName}`,
    description: "Create a new blog post",
};

export default function CreateBlogPage() {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Create Blog
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Write and publish your blog post. Share your knowledge and
                    insights with the world.
                </p>
            </div>

            {/* Create Blog Form */}
            <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <BlogCreate />
                </div>
                <div className="lg:col-span-5 relative">
                    <BlogMyList />
                </div>
            </div>
        </div>
    );
}
