import Link from "next/link";
import { Clock, User } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardImage,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogPostType } from "@/lib/types";

export function PostCard(post: BlogPostType) {
    return (
        <Card className="pt-0">
            <CardImage
                thumbnail={post.featuredImage ?? ""}
                title={post.featuredImageAlt ?? ""}
            />
            <CardHeader>
                <Badge variant={"secondary"}>{post.category?.name}</Badge>
                <Link href={`/blogs/${post.slug}`} className="group">
                    <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                    </h2>
                </Link>
            </CardHeader>
            <CardContent className="mb-auto">
                <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
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
