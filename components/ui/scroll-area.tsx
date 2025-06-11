"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

interface ScrollAreaProps
    extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
    showShadow?: boolean;
}

function ScrollArea({
    showShadow = false,
    className,
    children,
    ...props
}: ScrollAreaProps) {
    const [showTopShadow, setShowTopShadow] = React.useState(false);
    const [showBottomShadow, setShowBottomShadow] = React.useState(false);
    const viewportRef = React.useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        const scrollTop = viewportRef.current?.scrollTop ?? 0;
        const scrollBottom =
            (viewportRef.current?.scrollHeight ?? 0) -
            (viewportRef.current?.scrollTop ?? 0) -
            (viewportRef.current?.clientHeight ?? 0);
        setShowTopShadow(scrollTop > 0);
        setShowBottomShadow(scrollBottom > 0);
    };

    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={cn("relative", className)}
            {...props}
        >
            {showShadow && showTopShadow && (
                <div className="pointer-events-none absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-muted/70 to-transparent z-10 transition-colors" />
            )}

            {showShadow && showBottomShadow && (
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-muted/70 to-transparent z-10 transition-colors" />
            )}
            <ScrollAreaPrimitive.Viewport
                ref={viewportRef}
                onScroll={handleScroll}
                data-slot="scroll-area-viewport"
                className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

function ScrollBar({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                "flex touch-none p-px transition-colors select-none z-20",
                orientation === "vertical" &&
                    "h-full w-2 border-l border-l-transparent",
                orientation === "horizontal" &&
                    "h-2 flex-col border-t border-t-transparent",
                className
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot="scroll-area-thumb"
                className="bg-neutral-300/70 hover:bg-neutral-600/70 transition-colors relative flex-1 rounded-full"
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}

export { ScrollArea, ScrollBar };
