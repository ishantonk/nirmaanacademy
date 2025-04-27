"use client";

import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { CategoryType, TagType } from "@/lib/types";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageDropzone } from "@/components/ui/image-drop-zone";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Props definition for BlogForm component
type BlogFormProps = {
    formId: string;
    formProps: UseFormReturn<any>;
    categories: CategoryType[];
    tags: TagType[];
    uploadMutation: UseMutationResult<
        { url: string; success: boolean },
        Error,
        File,
        unknown
    >;
    onCreateTag: (name: string) => void;
    onSubmit: (values: any) => void;
};

export function BlogForm({
    formId,
    formProps,
    categories,
    tags,
    uploadMutation,
    onCreateTag,
    onSubmit,
}: BlogFormProps) {
    const [filter, setFilter] = useState("");

    const onFileSelect = (file: File) => {
        const preview = URL.createObjectURL(file);
        formProps.setValue("featuredImage", preview);
        uploadMutation.mutate(file);
    };

    const handleCreateTag = () => {
        const name = prompt("Enter new tag name:");
        if (name?.trim()) {
            onCreateTag(name.trim());
            setFilter("");
        }
    };

    const filteredTags = tags.filter((t) =>
        t.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Title Field */}
                <FormField
                    control={formProps.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                                <Input
                                    id="title"
                                    aria-required="true"
                                    placeholder="Enter blog title"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Keep it catchy and descriptive.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Featured Image Upload (Optional) */}
                <FormField
                    control={formProps.control}
                    name="featuredImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="featuredImage">
                                Featured Image{" "}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <ImageDropzone
                                    onFileSelect={onFileSelect}
                                    className="w-full h-60 cursor-pointer"
                                    placeholder={
                                        field.value ? (
                                            <Image
                                                src={field.value}
                                                alt="Featured Image"
                                                fill
                                                className="object-cover w-full h-full rounded"
                                            />
                                        ) : undefined
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Upload a cover image for the blog post.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Featured Image Alt Text (Optional) */}
                <FormField
                    control={formProps.control}
                    name="featuredImageAlt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="featuredImageAlt">
                                Image Alt Text{" "}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="featuredImageAlt"
                                    placeholder="Describe the image"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Important for SEO and accessibility.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Blog Content Field */}
                <FormField
                    control={formProps.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    id="content"
                                    aria-required="true"
                                    className="resize-y min-h-[200px]"
                                    placeholder="Full blog content"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category & Tags */}
                <div className="flex flex-col md:flex-row">
                    {/* Category */}
                    <FormField
                        control={formProps.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="categoryId">
                                    Category{" "}
                                    <span className="text-muted-foreground">
                                        (optional)
                                    </span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            id="categoryId"
                                            aria-label="Category"
                                        >
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem
                                                key={c.id}
                                                value={c.id}
                                                aria-label={c.name}
                                            >
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Tags */}
                    <FormField
                        control={formProps.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="tags">
                                    Tags{" "}
                                    <span className="text-muted-foreground">
                                        (optional)
                                    </span>
                                </FormLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start"
                                            aria-haspopup="listbox"
                                            aria-expanded="true"
                                        >
                                            {field.value?.length || 0} selected
                                        </Button>
                                    </DropdownMenuTrigger>
                                    {/* Make dropdown width match trigger */}
                                    <DropdownMenuContent
                                        side="bottom"
                                        align="start"
                                        sideOffset={4}
                                        className="w-full"
                                    >
                                        <DropdownMenuLabel>
                                            Select Tags
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <div className="p-2">
                                            <Input
                                                placeholder="Search tags..."
                                                value={filter}
                                                onChange={(e) =>
                                                    setFilter(e.target.value)
                                                }
                                            />
                                        </div>
                                        <ScrollArea className="max-h-48 space-y-2 p-2">
                                            {filteredTags.map((tag) => (
                                                <DropdownMenuCheckboxItem
                                                    key={tag.id}
                                                    checked={field.value?.includes(
                                                        tag.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const next = checked
                                                            ? [
                                                                  ...(field.value ||
                                                                      []),
                                                                  tag.id,
                                                              ]
                                                            : (
                                                                  field.value ||
                                                                  []
                                                              ).filter(
                                                                  (
                                                                      id: string
                                                                  ) =>
                                                                      id !==
                                                                      tag.id
                                                              );
                                                        field.onChange(next);
                                                    }}
                                                    aria-label={tag.name}
                                                >
                                                    {tag.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </ScrollArea>
                                        <DropdownMenuSeparator />
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                            type="button"
                                            onClick={handleCreateTag}
                                        >
                                            + Create New Tag
                                        </Button>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Meta Title */}
                <FormField
                    control={formProps.control}
                    name="metaTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="metaTitle">
                                Meta Title{" "}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="metaTitle"
                                    placeholder="SEO meta title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Meta Description */}
                <FormField
                    control={formProps.control}
                    name="metaDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="metaDescription">
                                Meta Description{" "}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    id="metaDescription"
                                    placeholder="SEO meta description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
