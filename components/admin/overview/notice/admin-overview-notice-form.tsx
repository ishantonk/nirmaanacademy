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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminNoticeFormValues } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";

interface AdminNoticeFormProps {
    formId: string;
    formProps: UseFormReturn<AdminNoticeFormValues>;
    onSubmit: (data: AdminNoticeFormValues) => void;
}

export function AdminNoticeForm({
    formId,
    formProps,
    onSubmit,
}: AdminNoticeFormProps) {
    return (
        <Form {...formProps}>
            <form
                id={formId}
                onSubmit={formProps.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Content Field */}
                <FormField
                    control={formProps.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-y min-h-24"
                                    placeholder="Write your notice here (max 300 chars)"
                                    {...field}
                                    maxLength={300}
                                />
                            </FormControl>
                            <FormDescription>
                                The body of your notice (up to 300 characters).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Visible Toggle */}
                <FormField
                    control={formProps.control}
                    name="visible"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-4">
                            <FormLabel className="mb-0">Visible</FormLabel>
                            <FormControl>
                                <Switch
                                    checked={field.value ?? false}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Toggle whether this notice is publicly visible.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
