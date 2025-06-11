"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Control, FieldValues, Path } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { humanize } from "@/lib/utils";

interface SwitchFieldProps<TFieldValues extends FieldValues>
    extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    name: Path<TFieldValues>;
    label?: string;
    description?: string;
    control: Control<TFieldValues>;
    isRequired?: boolean;
    className?: string;
}

export function SwitchField<TFieldValues extends FieldValues>({
    name,
    label = name,
    description = "",
    control,
    isRequired = false,
    className,
    ...props
}: SwitchFieldProps<TFieldValues>) {
    label = humanize(label);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <div className="inline-flex flex-row justify-start items-center gap-x-2">
                        <FormLabel className="line-clamp-1" htmlFor={name}>
                            {label}
                            {!isRequired && (
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            )}
                        </FormLabel>
                        <FormControl>
                            <Switch
                                {...props}
                                id={name}
                                {...field}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                {...(isRequired && { "aria-required": "true" })}
                                className={className}
                            />
                        </FormControl>
                    </div>
                    {fieldState.error ? (
                        // If there’s an error, show it here instead of the description
                        <FormMessage />
                    ) : (
                        // Otherwise show the normal helper text
                        description && (
                            <FormDescription className="line-clamp-1">{description}</FormDescription>
                        )
                    )}
                </FormItem>
            )}
        />
    );
}
