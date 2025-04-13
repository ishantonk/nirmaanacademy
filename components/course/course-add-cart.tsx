"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchIsInCart } from "@/lib/fetch";

interface AddToCartButtonProps {
    courseId: string;
    className?: string;
}

export function CourseAddCartButton({
    courseId,
    className,
}: AddToCartButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const [isInCart, setIsInCart] = useState(false); // Track cart status
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    // Fetch the current cart status for this course
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const result = await fetchIsInCart({ courseId, server: false });
                setIsInCart(result);
            } catch (error) {
                console.error("Failed to fetch cart status:", error);
            }
        };
        checkStatus();
    }, [courseId]);

    // Handle course addition to cart
    const handleAddToCart = async () => {
        if (!session) {
            router.push("/login"); // Redirect if not logged in
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || "Failed to add to cart");
            }

            toast.success("Added to cart", {
                description: "The course has been added to your cart.",
            });

            setIsInCart(true);
            router.refresh(); // Refresh to reflect global updates
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Error", {
                description: "Could not add course to cart.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return isInCart ? (
        <Button
            variant="outline"
            onClick={() => router.push("/cart")}
            className={className}
        >
            <Check className="mr-2 h-4 w-4" />
            Go to Cart
        </Button>
    ) : (
        <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding to cart...
                </>
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}
