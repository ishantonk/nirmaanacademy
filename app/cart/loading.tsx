import { CartItemCardSkeleton } from "@/components/cart/cart-item-card-skeleton";
import { CartOrderSummarySkeleton } from "@/components/cart/cart-order-summary-skeleton";

export default async function Loading() {
    <div className="container py-8 mx-auto px-4">
        <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                View your courses in cart.
            </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <CartItemCardSkeleton key={i} />
                ))}
            </div>
            <div>
                <CartOrderSummarySkeleton />
            </div>
        </div>
    </div>;
}
