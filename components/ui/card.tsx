import * as React from "react";
import Image from "next/image";

import { cn, isValidUrl } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-lg border py-6 group relative overflow-hidden",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className
            )}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className
            )}
            {...props}
        />
    );
}

interface CardImageProps extends React.ComponentProps<"div"> {
    thumbnail?: string;
    title?: string;
    overlay?: React.ReactNode;
}

function CardImage({
    className,
    thumbnail,
    title,
    overlay,
    ...props
}: CardImageProps) {
    const thumbnailUrl = isValidUrl(thumbnail ?? "") ? thumbnail : null;

    return (
        <div
            data-slot="card-image"
            className={cn("relative aspect-video overflow-hidden rounded-lg", className)}
            {...props}
        >
            {overlay && (
                <div className={"absolute z-10 inset-0"}>{overlay}</div>
            )}
            {thumbnail ? (
                <Image
                    src={thumbnailUrl ?? "/placeholder.svg"}
                    alt={title ?? ""}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No thumbnail</span>
                </div>
            )}
        </div>
    );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
            {...props}
        />
    );
}

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardImage,
    CardDescription,
    CardContent,
};
