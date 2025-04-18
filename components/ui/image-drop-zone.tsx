"use client";

import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface ImageDropzoneProps {
    /** Called with the selected File */
    onFileSelect: (file: File) => void;
    /** Optional extra styling */
    className?: string;
    /** Fallback content when no file is selected */
    placeholder?: React.ReactNode;
}

export function ImageDropzone({
    onFileSelect,
    className = "",
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
            className={`relative flex flex-col items-center justify-center border-2 rounded-lg p-6 
        ${
            isDragActive
                ? "border-primary bg-primary/10"
                : "border-dashed border-muted/60"
        } 
        ${className}`}
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
            {placeholder}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
            {isDragActive && (
                <div className="absolute inset-0 bg-white opacity-20 rounded-lg" />
            )}
        </div>
    );
}
