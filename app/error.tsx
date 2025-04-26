"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="container flex h-screen flex-col items-center justify-center mx-auto px-4">
            <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>
                <h1 className="mb-2 text-3xl font-bold">
                    Something went wrong
                </h1>
                <p className="mb-8 text-muted-foreground">
                    An unexpected error occurred. We&apos;ve been notified and
                    are working to fix the issue.
                </p>
                <div className="flex gap-2">
                    <Button onClick={() => reset()}>Try again</Button>
                    <Button variant="outline" asChild>
                        <Link href={"/"}>Go to Home</Link>
                    </Button>
                </div>
            </div>
            {toast.error(error.name, {
                description: error.message,
            })}
        </div>
    );
}
