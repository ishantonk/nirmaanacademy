"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { AlertTriangle, Loader2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
    /** Called with the selected File */
    onFileSelect: (file: File) => void;
    /** Optional extra styling */
    className?: string;
    /** Fallback content when no file is selected */
    placeholder?: React.ReactNode;

    /** Optional flag to show uploading state */
    isUploading?: boolean;
    /** Optional flag to show error state */
    isError?: boolean;
}

export function ImageDropzone({
    onFileSelect,
    className = "",
    isUploading = false,
    isError = false,
    placeholder = (
        <>
            <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
                Drag & drop an image here, or{" "}
                <span className="text-primary hover:underline cursor-pointer">
                    browse
                </span>
            </p>
        </>
    ),
}: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }

    function handleDragLeave(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }

    function handleClickBrowse() {
        inputRef.current?.click();
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
    }

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center border-2 rounded-lg p-6 cursor-pointer transition-colors duration-200 ease-in-out overflow-hidden h-full w-full bg-muted/80 text-muted-foreground",
                className,
                isDragActive
                    ? "border-dashed border-muted-foreground/60"
                    : "border-dashed border-muted-foreground/15"
            )}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickBrowse}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleClickBrowse();
                }
            }}
        >
            <>
                {isUploading && (
                    <div className="absolute inset-0 bg-black/50 z-10">
                        <div className="flex items-center justify-center h-full w-full">
                            <Loader2 className="animate-spin text-white dark:text-muted-foreground" />
                            <span className="text-white ml-2 text-sm font-semibold dark:text-muted-foreground drop-shadow-sm">
                                Uploading...
                            </span>
                        </div>
                    </div>
                )}
                {isError && (
                    <div className="absolute inset-0 bg-black/50 z-10">
                        <div className="flex items-center justify-center h-full w-full">
                            <AlertTriangle className="text-destructive animate-caret-blink" />
                            <span className="text-destructive ml-2 text-sm font-semibold drop-shadow-sm">
                                Upload failed
                            </span>
                        </div>
                    </div>
                )}
                {placeholder}
            </>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
            {isDragActive && (
                <div className="absolute inset-0" />
            )}
        </div>
    );
}
