"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addCartItem, fetchFindInCart } from "@/lib/services/api";

interface CartButtonProps extends React.ComponentProps<typeof Button> {
    courseId: string;
    attemptId: string;
    modeId: string;
}

export default function CartButton({
    courseId,
    attemptId,
    modeId,
    ...props
}: CartButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const [isInCart, setIsInCart] = useState(false); // Tracks if item is already in the cart
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state

    // Fetch initial cart status when component mounts or courseId changes
    useEffect(() => {
        const fetchCartStatus = async () => {
            setIsLoading(true);
            const inCart = !!(await fetchFindInCart(courseId));
            setIsInCart(inCart);
            setIsLoading(false);
        };

        fetchCartStatus();
    }, [session, courseId]);

    // Handles the add-to-cart logic with user feedback
    const handleAddToCart = useCallback(async () => {
        if (!session) {
            toast.error("Authentication Required", {
                description:
                    "You need to be logged in to add items to your cart.",
            });
            return;
        }

        setIsLoading(true);

        try {
            await addCartItem({ courseId, attemptId, modeId });
            setIsInCart(true);

            toast.success("Added to Cart", {
                description: "The course has been successfully added.",
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Add to Cart Failed", {
                description: "Something went wrong while adding the course.",
            });
        } finally {
            setIsLoading(false);
        }
    }, [session, courseId, attemptId, modeId]);

    // Renders the correct button based on cart status
    return isInCart ? (
        <Button
            onClick={() => router.push("/cart")}
            variant="outline"
            disabled={props.disabled || isLoading}
            className={`gap-x-2 flex-1 w-full ${props.className}`}
            {...props}
        >
            <Check className="h-4 w-4" />
            {props.size !== "icon" && "Go to Cart"}
        </Button>
    ) : (
        <Button
            onClick={handleAddToCart}
            variant="outline"
            disabled={props.disabled || isLoading}
            className={`gap-x-2 flex-1 w-full ${props.className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {props.size !== "icon" && "Adding to cart..."}
                </>
            ) : (
                <>
                    <ShoppingCart className="h-4 w-4" />
                    {props.size !== "icon" && "Add to Cart"}
                </>
            )}
        </Button>
    );
}
