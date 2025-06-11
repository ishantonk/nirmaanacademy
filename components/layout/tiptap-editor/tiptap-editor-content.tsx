"use client";

import { JSX } from "react";
import { type Editor, EditorContent, EditorContentProps } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import { ScrollArea } from "@/components/ui/scroll-area";

// TipTap Extensions
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

/**
 * Props for TipTapEditorContent component.
 */
type TipTapEditorContentProps = EditorContentProps;

/**
 * Renders the scrollable TipTap editor content area.
 */
export default function TipTapEditorContent({
    ...props
}: TipTapEditorContentProps): JSX.Element {
    return (
        <ScrollArea className="flex-1 w-full h-full overflow-hidden">
            <EditorContent
                {...props}
                className="w-full break-words whitespace-pre-wrap"
            />
        </ScrollArea>
    );
}

type EditorProps = {
    className?: string | "";
    content?: string | "";
    onChange: (content: string) => void;
};

/**
 * Custom hook that initializes and returns a TipTap editor instance.
 *
 * @param className - Optional CSS class applied to the editor's root element.
 * @param onChange - Callback function called when editor content changes.
 * @param content - Initial content for the editor.
 * @returns Editor instance or null if not initialized.
 */
export function useGetEditor({
    className,
    onChange,
    content,
}: EditorProps): Editor | null {
    return useEditor({
        extensions: [
            StarterKitConfig, // Core behaviors: bold, italic, lists, etc.
            LinkConfig, // Link behavior: validation, autolinking
            TextAlignConfig, // Text alignment for headings and paragraphs
            Underline, // Text underline support
            Typography, // Smart typography replacements
            Highlight, // Text highlighting
        ],
        content: content, // initial content can be customized via props or state
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-60 max-h-80 ${className}`,
            },
        },
        immediatelyRender: false,
    });
}

/**
 * StarterKit configuration: limits heading levels for cleaner toolbar.
 */
const StarterKitConfig = StarterKit.configure({
    heading: {
        levels: [1, 2, 3],
    },
});

/**
 * Link extension config: auto-linking, protocol defaults, and custom URL validation.
 */
const LinkConfig = Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    HTMLAttributes: {
        class: "text-primary underline cursor-pointer hover:text-primary/75",
    },

    /**
     * Validate URLs and restrict certain protocols or domains.
     */
    isAllowedUri: (url, ctx) => {
        try {
            const fullUrl = url.includes(":")
                ? url
                : `${ctx.defaultProtocol}://${url}`;
            const parsed = new URL(fullUrl);

            // Core validation
            if (!ctx.defaultValidate(parsed.href)) return false;

            // Block unsafe protocols
            const badSchemes = ["ftp", "file", "mailto"];
            const scheme = parsed.protocol.replace(/:$/, "");
            if (badSchemes.includes(scheme)) return false;

            // Enforce allowed protocols
            const allowed = ctx.protocols.map((p) =>
                typeof p === "string" ? p : p.scheme
            );
            if (!allowed.includes(scheme)) return false;

            // Block known malicious hosts
            const blockedHosts = ["example-phishing.com", "malicious-site.net"];
            if (blockedHosts.includes(parsed.hostname)) return false;

            return true;
        } catch {
            return false;
        }
    },

    /**
     * Determine if plain text URL should auto-link, excluding certain domains.
     */
    shouldAutoLink: (url) => {
        try {
            const parsed = new URL(url.includes(":") ? url : `https://${url}`);
            const skipHosts = [
                "example-no-autolink.com",
                "another-no-autolink.com",
            ];
            return !skipHosts.includes(parsed.hostname);
        } catch {
            return false;
        }
    },
});

/**
 * TextAlign config: apply to block types and allowed alignments.
 */
const TextAlignConfig = TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
});
