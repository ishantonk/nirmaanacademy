"use client";

import type { EditorContentProps } from "@tiptap/react";
import TipTapEditorContent from "@/components/layout/tiptap-editor/tiptap-editor-content";
import TipTapEditorMenu from "@/components/layout/tiptap-editor/tiptap-editor-menu";

type TipTapEditorProps = EditorContentProps & {
    className?: string;
};

export default function TipTapEditor({
    editor,
    className,
    ...props
}: TipTapEditorProps) {
    return (
        <div
            className={`flex flex-col items-center rounded-md border overflow-hidden ${
                className || ""
            }`}
        >
            <TipTapEditorMenu editor={editor} />
            <TipTapEditorContent {...props} editor={editor} />
        </div>
    );
}
