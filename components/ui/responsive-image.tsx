"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ResponsiveImageProps = React.ComponentProps<typeof Image> & {
    ratio?: number;
};

export default function ResponsiveImage({
    ratio = 16 / 9,
    className,
    src,
    alt,
    ...props
}: ResponsiveImageProps) {
    const [hasError, setHasError] = useState(false); // State to track image load error

    const handleImageError = () => {
        setHasError(true); // Set error state when image fails to load
    };

    return (
        <AspectRatio ratio={ratio}>
            {!hasError ? (
                <Image
                    {...props}
                    src={src}
                    alt={alt}
                    fill
                    className={`object-cover object-center ${className}`}
                    onError={handleImageError} // Attach the error handler
                />
            ) : (
                <div className="flex items-center gap-x-2 w-full h-full justify-center rounded bg-muted text-sm text-muted-foreground">
                    <ImageOff className="w-4 h-4" />
                    No thumbnail
                </div>
            )}
        </AspectRatio>
    );
}
