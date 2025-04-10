"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
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

    // State to track if the add-to-cart operation is loading
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle adding the course to the cart
    const handleAddToCart = async () => {
        // Redirect to login if user is not logged in
        if (!session) {
            return router.push("/login");
        }

        try {
            // Set loading state before making API call
            setIsLoading(true);

            // Send a POST request to add the course to the cart
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            });

            // If the response is not OK, extract the error message and throw an error
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to add to cart");
            }

            // Show success toast notification
            toast.success("Added to cart", {
                description: "The course has been added to your cart.",
            });

            // Optionally refresh the page or specific component parts to reflect any global changes
            router.refresh();
        } catch (error) {
            // Log error and show error toast notification if add-to-cart fails
            console.error("Error adding to cart:", error);
            toast.error("Error", {
                description: "Failed to add to cart. Please try again.",
            });
        } finally {
            // Reset the loading state in any case
            setIsLoading(false);
        }
    };

    // Function to navigate to the cart page
    const handleGoToCart = () => {
        router.push("/cart");
    };

    // Render "Go to Cart" button if the course is in the cart; otherwise, render the "Add to Cart" button
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
                <>
                    {/* Show loader icon with spinning animation while adding to cart */}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding to Cart...
                </>
            ) : (
                <>
                    {/* Show shopping cart icon when ready to add to cart */}
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}
