import { CartItemCardSkeleton } from "@/components/cart/cart-item-card-skeleton";
import { CartOrderSummarySkeleton } from "@/components/cart/cart-order-summary-skeleton";

export default async function Loading() {
    return (
        <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CartItemCardSkeleton key={i} />
                ))}
            </div>

            <CartOrderSummarySkeleton />
        </div>
    );
}
