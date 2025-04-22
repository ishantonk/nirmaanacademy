import { redirect } from "next/navigation";
import { CartItemList } from "@/components/cart/cart-item-list";
import { CartOrderSummary } from "@/components/cart/cart-order-summary";
import { getAuthSession } from "@/lib/auth";
import { fetchCart } from "@/lib/services/api";

export default async function CartPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const cartItems = await fetchCart();

    return (
        <div className="mt-8 grid gap-8 md:grid-cols-3">
            {/* Cart Items */}
            <CartItemList cartItems={cartItems} />

            {/* Sidebar */}
            <div>
                <CartOrderSummary cartItems={cartItems} />
            </div>
        </div>
    );
}
