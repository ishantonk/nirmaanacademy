"use client";

import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { humanize } from "@/lib/utils";

interface TextAreaFieldProps {
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    control: Control<any, any, any> | undefined;
    isRequired?: boolean;
    className?: string;
}

export function TextAreaField({
    name,
    label = humanize(name),
    placeholder = `Enter ${name}`,
    description = "",
    control,
    isRequired = false,
    className,
}: TextAreaFieldProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel htmlFor={name}>
                        {label}
                        {!isRequired && (
                            <span className="text-muted-foreground">
                                (optional)
                            </span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            id={name}
                            {...field}
                            {...(isRequired ? { "aria-required": "true" } : {})}
                            placeholder={placeholder}
                            className={className}
                        />
                    </FormControl>
                    {fieldState.error ? (
                        // If there’s an error, show it here instead of the description
                        <FormMessage />
                    ) : (
                        // Otherwise show the normal helper text
                        description && (
                            <FormDescription>{description}</FormDescription>
                        )
                    )}
                </FormItem>
            )}
        />
    );
}
