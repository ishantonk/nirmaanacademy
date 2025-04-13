import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartItemType } from "@/lib/types";
import { Suspense } from "react";
import { CartItemCardSkeleton } from "./cart-item-card-skeleton";

export function CartItemList({ cartItems }: { cartItems: CartItemType[] }) {
    if (cartItems.length === 0) {
        return (
            <div className="md:col-span-2 mt-8">
                <EmptyState
                    icon={ShoppingCart}
                    title="Your cart is empty"
                    description="Looks like you haven't added any courses to your cart yet."
                    action={
                        <Button asChild>
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => {
                if (item.course)
                    return (
                        <Suspense
                            key={item.id}
                            fallback={<CartItemCardSkeleton />}
                        >
                            <CartItemCard item={item} />;
                        </Suspense>
                    );
            })}
        </div>
    );
}
