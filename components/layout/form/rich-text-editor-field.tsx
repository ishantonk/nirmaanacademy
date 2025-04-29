"use client";

import { useCallback, useEffect } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { humanize } from "@/lib/utils";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    Quote,
    Redo,
    Strikethrough,
    UnderlineIcon,
    Undo,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RichTextEditorFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    description?: string;
    isRequired?: boolean;
    className?: string;
    width?: string;
    hight?: string;
}

export function RichTextEditorField<TFieldValues extends FieldValues>({
    name,
    label = humanize(name),
    placeholder = `Enter ${name}`,
    description = "",
    isRequired = false,
    className,
    width = "w-[26rem] md:w-xl lg:w-2xl",
    hight = "h-52",
}: RichTextEditorFieldProps<TFieldValues>) {
    // Get full form context
    const { control, getValues, watch, setValue } =
        useFormContext<TFieldValues>();

    // Initialize TipTap editor
    const editor = useEditor({
        extensions: [
            StarterKitConfig,
            Underline,
            TextAlignConfig,
            Typography,
            Highlight,
            LinkConfig,
        ],
        content: (getValues(name) as string) || "",
        onUpdate: ({ editor }) => {
            setValue(
                name,
                editor.getHTML() as unknown as TFieldValues[typeof name],
                { shouldValidate: true }
            );
        },
        editorProps: {
            attributes: {
                class: `focus:outline-none ${className!}`,
            },
        },
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
                    <div
                        className={`flex flex-col gap-2 ${className || ""} ${
                            width || ""
                        }`}
                    >
                        <EditorMenuBar editor={editor} />
                        {/* Tiptap Editor Menu */}

                        <div
                            className={`flex flex-col border rounded p-2 pr-0 ${
                                hight || ""
                            }`}
                        >
                            <ScrollArea className="flex-1 h-full pr-2">
                                {/* Tiptap Editor Content */}
                                <FormControl>
                                    <EditorContent
                                        id={name}
                                        {...field}
                                        placeholder={placeholder}
                                        {...(isRequired && {
                                            "aria-required": "true",
                                        })}
                                        editor={editor}
                                        className="editor w-full break-words whitespace-pre-wrap overflow-hidden"
                                    />
                                </FormControl>
                            </ScrollArea>
                        </div>
                    </div>
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

function EditorMenuBar({ editor }: { editor: Editor | null }) {
    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        try {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        } catch {
            toast.error("Failed to set link", {
                description:
                    "An error occurred while setting the link. Please try again.",
            });
        }
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="flex flex-row items-center justify-center rounded-md border p-0.5">
            <ScrollArea className="flex-1 w-full pb-1">
                <div className="relative flex flex-row flex-nowrap items-center justify-center gap-4 p-1 pb-0">
                    <TooltipProvider>
                        {/* Toolbar: Undo / Redo */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    asChild
                                    onClick={() =>
                                        editor.chain().focus().undo().run()
                                    }
                                    disabled={!editor.can().undo()}
                                >
                                    <TooltipTrigger>
                                        <Undo className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Button>
                                <TooltipContent>
                                    <p>Undo</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    asChild
                                    onClick={() =>
                                        editor.chain().focus().redo().run()
                                    }
                                    disabled={!editor.can().redo()}
                                >
                                    <TooltipTrigger>
                                        <Redo className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Button>
                                <TooltipContent>
                                    <p>Redo</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Heading */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="h1"
                                    aria-label="Heading 1"
                                    pressed={editor.isActive("heading", {
                                        level: 1,
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 1 })
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Heading1 className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Heading 1</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="h2"
                                    aria-label="Heading 2"
                                    pressed={editor.isActive("heading", {
                                        level: 2,
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 2 })
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Heading2 className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Heading 2</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="h3"
                                    aria-label="Heading 3"
                                    pressed={editor.isActive("heading", {
                                        level: 3,
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHeading({ level: 3 })
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Heading3 className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Heading 3</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Text align */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="left"
                                    pressed={editor.isActive({
                                        textAlign: "left",
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setTextAlign("left")
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <AlignLeft className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Align left</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="center"
                                    pressed={editor.isActive({
                                        textAlign: "center",
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setTextAlign("center")
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <AlignCenter className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Align center</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="right"
                                    pressed={editor.isActive({
                                        textAlign: "right",
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setTextAlign("right")
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <AlignRight className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Align right</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="justify"
                                    pressed={editor.isActive({
                                        textAlign: "justify",
                                    })}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setTextAlign("justify")
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <AlignJustify className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Align justify</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Format */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="paragraph"
                                    pressed={editor.isActive("paragraph")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setParagraph()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Pilcrow className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Paragraph</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="bold"
                                    aria-label="Bold"
                                    pressed={editor.isActive("bold")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Bold className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Bold</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="italic"
                                    aria-label="Italic"
                                    pressed={editor.isActive("italic")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleItalic()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Italic className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Italic</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="underline"
                                    aria-label="Underline"
                                    pressed={editor.isActive("underline")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleUnderline()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <UnderlineIcon className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Underline</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="strike"
                                    aria-label="Strike"
                                    pressed={editor.isActive("strike")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleStrike()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Strikethrough className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Strikethrough</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="highlight"
                                    pressed={editor.isActive("highlight")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleHighlight()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Highlighter className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Highlight</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="code"
                                    pressed={editor.isActive("code")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleCode()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Code className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Code</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* List */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="bulletList"
                                    pressed={editor.isActive("bulletList")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBulletList()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <List className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Bullet List</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="orderedList"
                                    pressed={editor.isActive("orderedList")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleOrderedList()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <ListOrdered className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Ordered List</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Other action */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Toggle
                                    asChild
                                    value="blockquote"
                                    pressed={editor.isActive("blockquote")}
                                    onPressedChange={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .toggleBlockquote()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Quote className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Toggle>
                                <TooltipContent>
                                    <p>Blockquote</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() =>
                                        editor
                                            .chain()
                                            .focus()
                                            .setHorizontalRule()
                                            .run()
                                    }
                                >
                                    <TooltipTrigger>
                                        <Minus className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Button>
                                <TooltipContent>
                                    <p>Horizontal Rule</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Attachments */}
                        <div className="flex flex-row gap-x-1 flex-nowrap">
                            <Tooltip>
                                <Button
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={setLink}
                                    className={
                                        editor.isActive("link")
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    <TooltipTrigger>
                                        <Link2 className="h-4 w-4" />
                                    </TooltipTrigger>
                                </Button>
                                <TooltipContent>
                                    <p>Link</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
        </div>
    );
}

const LinkConfig = Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
        try {
            // construct URL
            const parsedUrl = url.includes(":")
                ? new URL(url)
                : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
                return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
                return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
                typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
                return false;
            }

            // disallowed domains
            const disallowedDomains = [
                "example-phishing.com",
                "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
                return false;
            }

            // all checks have passed
            return true;
        } catch {
            return false;
        }
    },
    shouldAutoLink: (url) => {
        try {
            // construct URL
            const parsedUrl = url.includes(":")
                ? new URL(url)
                : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
                "example-no-autolink.com",
                "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
        } catch {
            return false;
        }
    },
});

const TextAlignConfig = TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
});

const StarterKitConfig = StarterKit.configure({
    heading: {
        levels: [1, 2, 3],
    },
});
