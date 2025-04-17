import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourseBuyNowProps {
    courseId: string;
    className?: string;
}

export function CourseBuyNow({ courseId, className }: CourseBuyNowProps) {
    const router = useRouter();
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false); // Track loading state

    // Check if course is enrolled.

    // Handle course buy now.
    const handleBuyNow = async () => {
        if (!session) {
            router.push("/login"); // Redirect if not logged in
            return;
        }

        setIsLoading(true);

        try {
            const params = new URLSearchParams();
            params.append("courseId", courseId);

            router.push(`/checkout/buy?courseId=${courseId}`);
        } catch (error) {
            console.error("Buying course error:", error);
            toast.error("Error", {
                description: "Could not able to buy course. Try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleBuyNow}
            disabled={isLoading}
            className={"gap-x-2" + className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Buying Now...
                </>
            ) : (
                <>
                    <ShoppingBag className="h-4 w-4" />
                    Buy Now
                </>
            )}
        </Button>
    );
}
