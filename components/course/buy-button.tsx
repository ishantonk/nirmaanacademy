"use client";

import { toast } from "sonner";
import { useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define the prop types for the BuyButton component
interface BuyButtonProps extends React.ComponentProps<typeof Button> {
    courseId: string;
}

export default function BuyButton({ courseId, ...props }: BuyButtonProps) {
    const router = useRouter();

    // Handler for redirecting to the checkout page with course ID
    const handleBuy = useCallback(() => {
        try {
            // Optional: You can pass the courseId as a query param if needed
            const params = new URLSearchParams({ courseId });

            router.push(`/checkout/buy?${params.toString()}`);
        } catch (error) {
            console.error("Buying course error:", error);

            // Show error toast notification if something goes wrong
            toast.error("Error", {
                description: "Could not buy the course. Try again later.",
            });
        }
    }, [router, courseId]);

    return (
        <Button
            onClick={handleBuy}
            className={`gap-x-2 flex-1 w-full ${props.className}`}
            {...props}
        >
            <ShoppingBag className="h-4 w-4" />
            Buy Now
        </Button>
    );
}
