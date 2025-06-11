"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addCartItem, fetchFindInCart } from "@/lib/services/api";

interface AddToCartButtonProps {
    courseId: string;
    attemptId: string;
    modeId: string;
    className?: string;
    size?: "default" | "icon";
}

export function CourseAddCartButton({
    courseId,
    attemptId,
    modeId,
    size = "default",
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
                const result = await fetchFindInCart(courseId);
                setIsInCart(!!result);
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
            await addCartItem({
                courseId,
                attemptId,
                modeId,
            });

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
            size={size === "icon" ? "icon" : "default"}
            onClick={() => router.push("/cart")}
            className={"gap-x-2" + className}
        >
            <Check className="h-4 w-4" />
            {size === "default" && "Go to Cart"}
        </Button>
    ) : (
        <Button
            onClick={handleAddToCart}
            variant={size === "icon" ? "outline" : "default"}
            size={size === "icon" ? "icon" : "default"}
            disabled={isLoading}
            className={"gap-x-2" + className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {size === "default" && "Adding to cart..."}
                </>
            ) : (
                <>
                    <ShoppingCart className="h-4 w-4" />
                    {size === "default" && "Add to Cart"}
                </>
            )}
        </Button>
    );
}
