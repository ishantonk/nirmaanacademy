"use client";

import { useEffect } from "react";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import {
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import TipTapEditor from "../tiptap-editor/tiptap-editor";
import { useGetEditor } from "../tiptap-editor/tiptap-editor-content";

interface RichTextEditorFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    description?: string;
    isRequired?: boolean;
    className?: string;
}

export function RichTextEditorField<TFieldValues extends FieldValues>({
    name,
    label = name,
    placeholder = `Enter ${name}`,
    description = "",
    isRequired = false,
    className,
    ...props
}: RichTextEditorFieldProps<TFieldValues>) {
    // Get full form context
    const { control, getValues, watch, setValue } =
        useFormContext<TFieldValues>();

    const editor = useGetEditor({
        content: getValues(name) as string,
        onChange: (content: string) =>
            setValue(
                name,
                content as PathValue<TFieldValues, Path<TFieldValues>>,
                { shouldValidate: true }
            ),
        className: "prose"
    });

    // Sync editor when form value changes (e.g., reset)
    useEffect(() => {
        const subscription = watch((values) => {
            const html = values[name] as string;
            if (editor && html !== editor.getHTML()) {
                editor.commands.setContent(html || "");
            }
        });
        return () => subscription.unsubscribe();
    }, [control, editor, name, watch]);

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
                    <TipTapEditor
                        {...props}
                        id={name}
                        {...field}
                        {...(isRequired ? { "aria-required": "true" } : {})}
                        placeholder={placeholder}
                        className={className}
                        editor={editor}
                    />
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
