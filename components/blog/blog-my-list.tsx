"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthorBlogsAdmin } from "@/lib/services/api";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Skeleton } from "../ui/skeleton";
import { EmptyState } from "../ui/empty-state";
import { Newspaper } from "lucide-react";
import { BlogAuthorCard } from "./blog-author-card";

export function BlogMyList() {
    const { data: session } = useSession();
    const userName = session?.user?.name || "Guest";

    const {
        data: blogs,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["authorBlogs"],
        queryFn: fetchAuthorBlogsAdmin,
    });

    if (isLoading) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>{userName} Blog Posts</CardTitle>
                    <CardDescription>
                        Loading blogs, please wait...
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    className="h-8 w-full rounded-md"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>{userName} Blog Posts</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-14rem)] p-0">
                    <div className="flex flex-col items-center justify-center gap-2 text-destructive bg-destructive/10 p-4 rounded-md h-1/2 px-4 mx-4">
                        <span className="font-semibold">
                            Failed to load blogs.
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Please try again later.
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>{userName} Blog Posts</CardTitle>
                <CardDescription>List of all blogs.</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-14rem)] p-0">
                {blogs && blogs.length ? (
                    <ScrollArea className="h-full px-6 py-4">
                        <div className="space-y-4">
                            {blogs.map((blog) => (
                                <div key={blog.id}>
                                    <BlogAuthorCard blog={blog} />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <EmptyState
                        icon={Newspaper}
                        title="No Blogs Found"
                        description="You haven't added any blog yet. Create a new blog."
                    />
                )}
            </CardContent>
        </Card>
    );
}
