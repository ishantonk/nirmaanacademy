import { CheckoutFormSkeleton } from "@/components/checkout/checkout-form-skeleton";
import { CheckoutOrderSummarySkeleton } from "@/components/checkout/checkout-order-summary-skeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CheckoutOrderSummarySkeleton />
            <CheckoutFormSkeleton />
        </div>
    );
}
