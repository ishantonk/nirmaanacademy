import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="container flex h-[calc(100vh-4rem)] items-center justify-center mx-auto px-4">
            <div className="flex flex-col items-center gap-2 max-w-md">
                <div className="flex flex-row items-center justify-center gap-x-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <h2 className="text-xl font-semibold text-center text-foreground">
                        Loading...
                    </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Please wait while we load your content.
                </p>
            </div>
        </div>
    );
}
