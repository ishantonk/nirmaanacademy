"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddToCartButtonProps {
    courseId: string;
    isInCart: boolean;
    className?: string;
}

export function CourseAddCartButton({
    courseId,
    isInCart,
    className,
}: AddToCartButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!session) {
            return router.push("/login");
        }

        try {
            setIsLoading(true);

            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to add to cart");
            }

            toast.success("Added to cart", {
                description: "The course has been added to your cart.",
            });

            router.refresh();
        } catch {
            toast.error("Error", {
                description: "Failed to add to cart. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoToCart = () => {
        router.push("/cart");
    };

    return isInCart ? (
        <Button
            variant="outline"
            onClick={handleGoToCart}
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
                "Adding to Cart..."
            ) : (
                <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}
