"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { humanize } from "@/lib/utils";

interface TextFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    description?: string;
    control: Control<TFieldValues>;
    isRequired?: boolean;
    className?: string;
}

export function TextField<TFieldValues extends FieldValues>({
    name,
    label = humanize(name),
    placeholder = `Enter ${name}`,
    description = "",
    control,
    isRequired = false,
    className,
}: TextFieldProps<TFieldValues>) {
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
                        <Input
                            id={name}
                            {...field}
                            placeholder={placeholder}
                            {...(isRequired && { "aria-required": "true" })}
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
