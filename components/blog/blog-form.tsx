"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { AdminBlogFormValues, CategoryType, TagType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/layout/form/text-field";
import { ImageField } from "@/components/layout/form/image-field";
import { TextAreaField } from "@/components/layout/form/text-area-field";
import { SelectField } from "@/components/layout/form/select-field";
import { MultiSelectField } from "@/components/layout/form/multi-select-field";
import { BlogCreateTag } from "@/components/blog/blog-create-tag";
import { RichTextEditorField } from "../layout/form/rich-text-editor-field";

// Props definition for BlogForm component
type BlogFormProps = {
    formId: string;
    formProps: UseFormReturn<AdminBlogFormValues>;
    categories: CategoryType[];
    tags: TagType[];
    uploadMutation: UseMutationResult<
        { url: string; success: boolean },
        Error,
        File,
        unknown
    >;
    onSubmit: (values: AdminBlogFormValues) => void;
};

export function BlogForm({
    formId,
    formProps,
    categories,
    tags,
    uploadMutation,
    onSubmit,
}: BlogFormProps) {
    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Title Field */}
                <TextField
                    control={formProps.control}
                    name="title"
                    placeholder="Enter blog title"
                    description="Keep it catchy and descriptive."
                    isRequired
                />

                {/* Featured Image Upload (Optional) */}
                <ImageField
                    control={formProps.control}
                    uploadMutation={uploadMutation}
                    name="featuredImage"
                    description="Upload a cover image for the blog post."
                />

                {/* Featured Image Alt Text (Optional) */}
                <TextField
                    control={formProps.control}
                    name="featuredImageAlt"
                    placeholder="Describe the image"
                    description="Important for SEO and accessibility."
                />

                {/* Blog Content Field */}
                <RichTextEditorField
                    name="content"
                    placeholder="Full blog content"
                    description="Write your blog post here. You can use Markdown."
                    isRequired
                />

                {/* Excerpt Field */}
                <TextAreaField
                    control={formProps.control}
                    name="excerpt"
                    placeholder="Short excerpt for the blog post"
                    description="This will be displayed on the blog list page."
                    className="resize-y min-h-20"
                />

                {/* Category & Tags */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Category */}
                    <SelectField
                        control={formProps.control}
                        name="categoryId"
                        label="Category"
                        selectOptions={categories.map((category) => ({
                            value: category.id,
                            label: category.name,
                        }))}
                        searchInput
                        placeholder="Select a category"
                        description="Select a category for your blog post."
                        isRequired
                        className="min-w-2xs md:min-w-56"
                    />

                    {/* Tags */}
                    <MultiSelectField
                        control={formProps.control}
                        name="tags"
                        multiSelectOptions={tags.map((tag) => ({
                            value: tag.id,
                            label: tag.name,
                        }))}
                        createNew={<BlogCreateTag />}
                        searchInput
                        placeholder="Select tags"
                        description="Select tags for your blog post."
                        width="min-w-2xs w-fit md:min-w-56"
                    />
                </div>

                {/* Meta Title */}
                <TextField
                    control={formProps.control}
                    name="metaTitle"
                    placeholder="SEO meta title"
                    description="This will be used as the title in search engines."
                />

                {/* Meta Description */}
                <TextAreaField
                    control={formProps.control}
                    name="metaDescription"
                    placeholder="SEO meta description"
                    description="This will be used as the description in search engines."
                    className="resize-y min-h-20"
                />

                {/* Status */}
                <SelectField
                    control={formProps.control}
                    name="status"
                    label="Status"
                    selectOptions={[
                        { value: "DRAFT", label: "Draft" },
                        { value: "PUBLISHED", label: "Published" },
                    ]}
                    placeholder="Select status"
                    description="Select the status of your blog post."
                    isRequired
                    className="min-w-32 md:min-w-40"
                />
            </form>
        </Form>
    );
}
