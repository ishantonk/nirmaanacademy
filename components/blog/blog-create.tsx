"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlogForm } from "@/components/blog/blog-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    CategoryType,
    TagType,
    BlogPostType,
    AdminBlogFormValues,
    zBlogSchema,
} from "@/lib/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    createBlog,
    fetchCategories,
    fetchTags,
    uploadToBlob,
} from "@/lib/services/api";
import { useEffect } from "react";

export function BlogCreate() {
    const queryClient = useQueryClient();
    const formId = "create-blog-form";

    // Fetch categories
    const {
        data: categories = [],
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    // Fetch tags
    const {
        data: tags = [],
        isLoading: tagsLoading,
        isError: tagsError,
    } = useQuery<TagType[]>({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    const form = useForm<AdminBlogFormValues>({
        resolver: zodResolver(zBlogSchema),
        defaultValues: {
            title: "",
            categoryId: "",
            tags: [],
            content: "",
            featuredImage: "",
            featuredImageAlt: "",
            metaTitle: "",
            metaDescription: "",
            status: "DRAFT",
        },
    });

    // 1) watch status
    const status = form.watch("status");

    // 2) set publishedAt the moment it flips to PUBLISHED
    useEffect(() => {
        if (status === "PUBLISHED" && !form.getValues("publishedAt")) {
            form.setValue("publishedAt", new Date(), {
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    }, [status, form]);

    // Create blog mutation
    const mutation = useMutation<BlogPostType, Error, AdminBlogFormValues>({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog created successfully!");
            form.reset();
        },
        onError: (error: Error) => {
            toast.error("Creating blog failed", {
                description: error.message,
            });
        },
    });

    // Upload image mutation
    const uploadMutation = useMutation<
        { url: string; success: boolean },
        Error,
        File
    >({
        mutationFn: (file) => uploadToBlob(file),
        onSuccess: (uploadedUrl) => {
            toast.success("Blog thumbnail uploaded");
            form.setValue("featuredImage", uploadedUrl.url.toString());
        },
        onError: (error: Error) => {
            toast.error("Upload failed", { description: error.message });
        },
    });

    const submitting = mutation.isPending || uploadMutation.isPending;

    const onSubmit = (data: AdminBlogFormValues) => {
        mutation.mutate(data);
    };

    const loading = categoriesLoading || tagsLoading;
    const error = categoriesError || tagsError;

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="h-6 w-48 bg-muted rounded animate-pulse" />
                    <CardDescription className="mt-2 h-4 w-72 bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                            <div className="h-10 w-full bg-muted rounded animate-pulse" />
                        </div>
                    ))}
                    <div className="flex justify-end pt-4">
                        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Error loading form</CardTitle>
                    <CardDescription>
                        Failed to fetch categories or tags.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            queryClient.invalidateQueries({
                                queryKey: ["categories"],
                            });
                            queryClient.invalidateQueries({
                                queryKey: ["tags"],
                            });
                        }}
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new blog</CardTitle>
                <CardDescription>
                    Add new blog post for Nirmaan Academy.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BlogForm
                    formId={formId}
                    formProps={form}
                    categories={categories}
                    tags={tags}
                    uploadMutation={uploadMutation}
                    onSubmit={onSubmit}
                />
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-x-2">
                <Button
                    form={formId}
                    type="submit"
                    disabled={!form.formState.isDirty || submitting}
                >
                    {submitting ? "Creating..." : "Create Blog"}
                </Button>
            </CardFooter>
        </Card>
    );
}
