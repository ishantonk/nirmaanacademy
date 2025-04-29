"use client";

import { JSX, useState } from "react";
import { Search } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { humanize } from "@/lib/utils";

interface MultiSelectFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    multiSelectOptions: {
        value: string;
        label: string;
    }[];
    createNew?: JSX.Element;
    searchInput?: boolean;
    placeholder?: string;
    description?: string;
    control: Control<TFieldValues>;
    isRequired?: boolean;
    className?: string;
    width?: string;
}

export function MultiSelectField<TFieldValues extends FieldValues>({
    name,
    label = humanize(name),
    multiSelectOptions,
    createNew,
    searchInput = false,
    description = "",
    control,
    isRequired = false,
    className,
    width = "w-full",
}: MultiSelectFieldProps<TFieldValues>) {
    const [filter, setFilter] = useState("");

    const filteredOptions = multiSelectOptions.filter((t) =>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className={`justify-start ${className} ${width}`}
                                    aria-haspopup="listbox"
                                    aria-expanded={true}
                                >
                                    {field.value?.length || 0} selected
                                </Button>
                            </FormControl>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className={`flex flex-col ${
                                filteredOptions.length > 6 ? "h-72" : "h-fit"
                            } ${width}`}
                        >
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
                            {searchInput && <DropdownMenuSeparator />}

                            {/* List of options */}
                            <div className="flex flex-col flex-1 overflow-hidden h-full">
                                <ScrollArea className="flex-1 h-full space-y-2 p-2">
                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                key={option.value}
                                                className="capitalize"
                                                aria-label={option.label}
                                                checked={field.value?.includes(
                                                    option.value
                                                )}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([
                                                            ...(field.value ||
                                                                []),
                                                            option.value,
                                                        ]);
                                                    }
                                                    if (!checked) {
                                                        field.onChange(
                                                            (
                                                                field.value as string[]
                                                            )?.filter(
                                                                (
                                                                    value: string
                                                                ) =>
                                                                    value !==
                                                                    option.value
                                                            )
                                                        );
                                                    }
                                                }}
                                            >
                                                {option.label}
                                            </DropdownMenuCheckboxItem>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-sm text-muted-foreground">
                                                No options found
                                            </p>
                                        </div>
                                    )}
                                </ScrollArea>
                            </div>

                            {createNew && <DropdownMenuSeparator />}
                            {/* Button for creating new option (optional) */}
                            {createNew && (
                                <DropdownMenuItem asChild>
                                    {createNew}
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
