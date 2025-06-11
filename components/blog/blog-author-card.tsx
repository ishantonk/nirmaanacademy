import Image from "next/image";
import { BlogPostType } from "@/lib/types";
import { isValidUrl } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

export function BlogAuthorCard({ blog }: { blog: BlogPostType }) {
    const thumbnailUrl = isValidUrl(blog.featuredImage || "")
        ? blog.featuredImage
        : null;
    return (
        <div className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3 gap-4 ">
            {thumbnailUrl ? (
                <div className="shrink-0 relative w-32 h-20 rounded overflow-hidden bg-muted">
                    <Image
                        src={thumbnailUrl}
                        alt={blog.featuredImageAlt!}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : (
                <div className="shrink-0 flex w-32 h-20 items-center justify-center rounded bg-muted text-sm text-muted-foreground">
                    No thumbnail
                </div>
            )}

            <div className="flex flex-col justify-center items-start space-y-1">
                <h2 className="text-sm font-semibold line-clamp-1 max-w-[200px]">
                    {blog.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {blog.excerpt}
                </p>
            </div>
            <Select defaultValue={blog.status}>
                <SelectTrigger size="sm" value={blog.status} className="w-64 scale-75">
                    <SelectValue placeholder="Status"  />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
            </Select>

            {/* <div className="flex flex-1 items-center justify-end">
                <div className="flex flex-row gap-2 items-center justify-center">

                </div>
            </div> */}
        </div>
    );
}
