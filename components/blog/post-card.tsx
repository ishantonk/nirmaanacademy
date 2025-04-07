import Link from "next/link";
import Image from "next/image";
import { Clock, User } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isValidUrl } from "@/lib/utils";
import { BlogPostType } from "@/lib/types";

export function PostCard(post: BlogPostType) {
    const featuredImage = isValidUrl(
        post.featuredImage ? post.featuredImage : ""
    )
        ? post.featuredImage
        : null;
    return (
        <Card key={post.id} className="flex flex-col overflow-hidden py-0 pb-6">
            <div className="relative h-48 w-full">
                {featuredImage ? (
                    <Image
                        src={featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">
                            No thumbnail
                        </span>
                    </div>
                )}
            </div>
            <CardHeader>
                <Badge className="text-sm text-muted-foreground mb-2">
                    {post.category?.name}
                </Badge>
                <Link href={`/blogs/${post.slug}`} className="group">
                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                </Link>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author?.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTimeMinutes} min read
                        </div>
                    </div>
                    <Button asChild className="w-full">
                        <Link href={`/blogs/${post.slug}`}>Read More</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
