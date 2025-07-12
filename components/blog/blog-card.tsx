import { BlogPostType } from "@/lib/types";
import ResponsiveImage from "../ui/responsive-image";
import { formatDate } from "@/lib/format";

export default function BlogCard({ blog }: { blog: BlogPostType }) {
    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div>
                <ResponsiveImage
                    src={blog.featuredImage || ""}
                    alt={blog.featuredImageAlt || blog.title}
                />
            </div>
            <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                    {blog.title}
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                    {blog.excerpt || "No excerpt available for this blog post."}
                </p>
            </div>
            <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                <span className="text-sm text`-slate-600 font-medium">
                    Last updated: {formatDate(blog.updatedAt)} hours ago
                </span>
            </div>
        </div>
    );
}
