"use client";

import { JSX, useState } from "react";
import { Search } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { humanize } from "@/lib/utils";

interface SelectFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    selectOptions: {
        value: string;
        label: string;
    }[];
    handleCreateNew?: JSX.Element;
    searchInput?: boolean;
    placeholder?: string;
    description?: string;
    control: Control<TFieldValues>;
    isRequired?: boolean;
    className?: string;
}

export function SelectField<TFieldValues extends FieldValues>({
    name,
    label = humanize(name),
    selectOptions,
    handleCreateNew,
    searchInput = false,
    placeholder = `Enter ${name}`,
    description = "",
    control,
    isRequired = false,
    className,
}: SelectFieldProps<TFieldValues>) {
    const [filter, setFilter] = useState("");

    const filteredOptions = selectOptions.filter((t) =>
        t.label.toLowerCase().includes(filter.toLowerCase())
    );
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
                    <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        {...(isRequired ? { "aria-required": "true" } : {})}
                    >
                        <FormControl>
                            <SelectTrigger
                                id={field.name}
                                className={className}
                                aria-label={label}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {/* Search input */}
                            {searchInput && (
                                <div className="relative p-2">
                                    <Search className="absolute bottom-1/2 left-4 translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        className="pl-8"
                                        type="text"
                                        placeholder={`Search ${label}...`}
                                        value={filter}
                                        onChange={(e) =>
                                            setFilter(e.target.value)
                                        }
                                    />
                                </div>
                            )}
                            {searchInput && <SelectSeparator />}

                            {/* List of options */}
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="capitalize"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-full p-2">
                                    <p className="text-sm text-muted-foreground">
                                        No options found
                                    </p>
                                </div>
                            )}

                            {handleCreateNew && <SelectSeparator />}
                            {/* Button for creating new option (optional) */}
                            {handleCreateNew && (
                                <SelectItem disabled value="" asChild>
                                    {handleCreateNew}
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
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
