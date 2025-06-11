"use client";

import {
    useCallback,
    ForwardRefExoticComponent,
    RefAttributes,
    MouseEventHandler,
} from "react";
import type { Editor } from "@tiptap/react";
import { toast } from "sonner";

// Lucide icons
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

// UI Components
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Utility functions
import { humanize } from "@/lib/utils";

// Props for the main menu component
interface TipTapEditorMenuProps {
    editor: Editor | null;
}

/**
 * Main toolbar for TipTap editor.
 * Renders grouped control buttons and toggles.
 */
export default function TipTapEditorMenu({ editor }: TipTapEditorMenuProps) {
    if (!editor) return null;

    const controls = buildMenuList(editor);

    // Split controls into logical groups for responsive layout
    const [history, headings, alignment, formatting, lists, others] = [
        controls.slice(0, 2), // undo, redo
        controls.slice(2, 5), // h1, h2, h3
        controls.slice(5, 9), // text alignment
        controls.slice(9, 16), // paragraph, bold, italic, etc.
        controls.slice(16, 18), // bullet & ordered list
        controls.slice(18), // blockquote, hr, link
    ];

    return (
        <div className="border-b bg-neutral-100 dark:bg-neutral-600">
            <ScrollArea className="max-w-2xs sm:max-w-[34rem] md:max-w-2xl">
                <div className="flex items-center gap-x-2 p-1">
                    <ControlGroup>{history.map(renderButton)}</ControlGroup>
                    <ControlGroup>{headings.map(renderToggle)}</ControlGroup>
                    <ControlGroup>{alignment.map(renderToggle)}</ControlGroup>
                    <ControlGroup>{formatting.map(renderToggle)}</ControlGroup>
                    <ControlGroup>{lists.map(renderToggle)}</ControlGroup>

                    {/* Other actions: blockquote, horizontal rule, link */}
                    <ControlGroup>
                        {others.map((ctrl, idx) =>
                            ctrl.onPressedChange ? (
                                <EditorMenuToggle
                                    key={idx}
                                    value={ctrl.value || ""}
                                    label={ctrl.label}
                                    icon={ctrl.icon}
                                    pressed={ctrl.pressed}
                                    onPressedChange={
                                        ctrl.onPressedChange || (() => {})
                                    }
                                />
                            ) : (
                                <EditorMenuButton key={idx} {...ctrl} />
                            )
                        )}
                    </ControlGroup>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

/**
 * Render a toggle button with tooltip.
 */
function renderToggle(ctrl: MenuControl) {
    return (
        <EditorMenuToggle
            key={ctrl.value}
            value={ctrl.value || ""}
            label={ctrl.label}
            icon={ctrl.icon}
            pressed={ctrl.pressed}
            onPressedChange={ctrl.onPressedChange!}
        />
    );
}

/**
 * Render a simple icon button with tooltip.
 */
function renderButton(ctrl: MenuControl) {
    return (
        <EditorMenuButton
            key={ctrl.label}
            label={ctrl.label}
            icon={ctrl.icon}
            onClick={ctrl.onClick}
            disabled={ctrl.disabled}
            className={ctrl.className}
        />
    );
}

/**
 * Toggle button wrapper using Toggle from UI library.
 */
function EditorMenuToggle({
    value,
    label = value,
    icon: Icon,
    pressed = false,
    onPressedChange,
}: {
    value: string;
    label?: string;
    icon: React.ElementType;
    pressed?: boolean;
    onPressedChange(pressed: boolean): void;
}) {
    return (
        <Tooltip>
            <Toggle
                asChild
                value={value}
                aria-label={label}
                pressed={pressed}
                onPressedChange={onPressedChange}
                className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-primary/20 hover:text-primary group"
            >
                <TooltipTrigger className="inline-flex shrink-0 p-1">
                    <Icon className="h-4 w-4 group-data-[state=on]:text-primary group-data-[state=on]:stroke-3" />
                </TooltipTrigger>
            </Toggle>
            <TooltipContent>
                <span>{humanize(label)}</span>
            </TooltipContent>
        </Tooltip>
    );
}

/**
 * Button wrapper with tooltip.
 */
function EditorMenuButton<T extends HTMLButtonElement>({
    label,
    icon: Icon,
    onClick,
    className = "",
    disabled = false,
}: {
    label?: string;
    icon: React.ElementType;
    onClick?: MouseEventHandler<T>;
    className?: string;
    disabled?: boolean;
}) {
    return (
        <Tooltip>
            <Button
                asChild
                variant="ghost"
                size="icon"
                type="button"
                onClick={onClick}
                className={`inline-flex shrink-0 p-1 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-primary/20 hover:text-primary group ${className}`}
                disabled={disabled}
            >
                <TooltipTrigger>
                    <Icon className="h-4 w-4 group-hover:text-primary group-hover:stroke-3" />
                </TooltipTrigger>
            </Button>
            <TooltipContent>
                <span>{humanize(label || "")}</span>
            </TooltipContent>
        </Tooltip>
    );
}

/**
 * Groups related controls visually.
 */
function ControlGroup({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-x-1 border-r pr-1 mr-1 last:border-r-0 last:pr-0 last:mr-0">
            {children}
        </div>
    );
}

/**
 * Defines the shape of each control object.
 */
type MenuControl = {
    value?: string;
    label?: string;
    icon: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
    onClick?: () => boolean | void;
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    className?: string;
    disabled?: boolean;
};

/**
 * Builds the list of menu controls based on editor instance state.
 */
function buildMenuList(editor: Editor): MenuControl[] {
    const addLink = useAddLink(editor);

    return [
        // History
        {
            label: "Undo",
            icon: Undo,
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().undo(),
        },
        {
            label: "Redo",
            icon: Redo,
            onClick: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().redo(),
        },

        // Headings
        {
            value: "h1",
            label: "Heading 1",
            icon: Heading1,
            pressed: editor.isActive("heading", { level: 1 }),
            onPressedChange: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
            value: "h2",
            label: "Heading 2",
            icon: Heading2,
            pressed: editor.isActive("heading", { level: 2 }),
            onPressedChange: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
            value: "h3",
            label: "Heading 3",
            icon: Heading3,
            pressed: editor.isActive("heading", { level: 3 }),
            onPressedChange: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },

        // Text alignment
        {
            value: "left",
            label: "Align left",
            icon: AlignLeft,
            pressed: editor.isActive({ textAlign: "left" }),
            onPressedChange: () =>
                editor.chain().focus().setTextAlign("left").run(),
        },
        {
            value: "center",
            label: "Align center",
            icon: AlignCenter,
            pressed: editor.isActive({ textAlign: "center" }),
            onPressedChange: () =>
                editor.chain().focus().setTextAlign("center").run(),
        },
        {
            value: "right",
            label: "Align right",
            icon: AlignRight,
            pressed: editor.isActive({ textAlign: "right" }),
            onPressedChange: () =>
                editor.chain().focus().setTextAlign("right").run(),
        },
        {
            value: "justify",
            label: "Align justify",
            icon: AlignJustify,
            pressed: editor.isActive({ textAlign: "justify" }),
            onPressedChange: () =>
                editor.chain().focus().setTextAlign("justify").run(),
        },

        // Formatting
        {
            value: "paragraph",
            label: "Paragraph",
            icon: Pilcrow,
            pressed: editor.isActive("paragraph"),
            onPressedChange: () => editor.chain().focus().setParagraph().run(),
        },
        {
            value: "bold",
            label: "Bold",
            icon: Bold,
            pressed: editor.isActive("bold"),
            onPressedChange: () => editor.chain().focus().toggleBold().run(),
        },
        {
            value: "italic",
            label: "Italic",
            icon: Italic,
            pressed: editor.isActive("italic"),
            onPressedChange: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            value: "underline",
            label: "Underline",
            icon: UnderlineIcon,
            pressed: editor.isActive("underline"),
            onPressedChange: () =>
                editor.chain().focus().toggleUnderline().run(),
        },
        {
            value: "strike",
            label: "Strikethrough",
            icon: Strikethrough,
            pressed: editor.isActive("strike"),
            onPressedChange: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            value: "highlight",
            label: "Highlighter",
            icon: Highlighter,
            pressed: editor.isActive("highlight"),
            onPressedChange: () =>
                editor.chain().focus().toggleHighlight().run(),
        },
        {
            value: "code",
            label: "Code",
            icon: Code,
            pressed: editor.isActive("code"),
            onPressedChange: () => editor.chain().focus().toggleCode().run(),
        },

        // Lists
        {
            value: "bulletList",
            label: "Bullet List",
            icon: List,
            pressed: editor.isActive("bulletList"),
            onPressedChange: () =>
                editor.chain().focus().toggleBulletList().run(),
        },
        {
            value: "orderedList",
            label: "Ordered List",
            icon: ListOrdered,
            pressed: editor.isActive("orderedList"),
            onPressedChange: () =>
                editor.chain().focus().toggleOrderedList().run(),
        },

        // Other actions
        {
            value: "blockquote",
            label: "Blockquote",
            icon: Quote,
            pressed: editor.isActive("blockquote"),
            onPressedChange: () =>
                editor.chain().focus().toggleBlockquote().run(),
        },
        {
            label: "Horizontal Rule",
            icon: Minus,
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            label: "Link",
            icon: Link2,
            onClick: addLink,
            className: editor.isActive("link") ? "is-active" : "",
        },
    ];
}

/**
 * Hook to prompt user for URL and apply or remove link.
 */
function useAddLink(editor: Editor | null) {
    return useCallback(() => {
        if (!editor) return;

        const prevHref = editor.getAttributes("link").href;
        const input = window.prompt("Enter URL", prevHref)?.trim();

        // If cancelled or empty, remove link
        if (!input) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // Ensure protocol
        const url = /^https?:\/\//.test(input) ? input : `https://${input}`;

        try {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        } catch (e) {
            toast.error("Failed to set link", {
                description:
                    "An error occurred while setting the link. Please try again.",
            });
        }
    }, [editor]);
}
