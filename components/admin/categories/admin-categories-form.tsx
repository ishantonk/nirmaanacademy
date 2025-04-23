"use client";

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
import { AdminCategoriesFormValues } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";

interface AdminCategoriesFormProps {
    formId: string;
    formProps: UseFormReturn<AdminCategoriesFormValues>;
    onSubmit: (data: AdminCategoriesFormValues) => void;
}

export function AdminCategoriesForm({
    formId,
    formProps,
    onSubmit,
}: AdminCategoriesFormProps) {
    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Name Field */}
                <FormField
                    control={formProps.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your category name"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display category name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    control={formProps.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-y min-h-24"
                                    placeholder="Tell us a little about category"
                                    {...field}
                                    // Ensure that if field.value is null or undefined, we use an empty string.
                                    // value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormDescription>
                                Write a short description about category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
