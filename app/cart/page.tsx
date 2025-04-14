import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CartItemList } from "@/components/cart/cart-item-list";
import { CartOrderSummary } from "@/components/cart/cart-order-summary";
import { getAuthSession } from "@/lib/auth";
import { CartItemType } from "@/lib/types";
import { fetchCartItems } from "@/lib/fetch";
import { brandName } from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Shopping Cart | " + brandName,
    description: "Your shopping cart",
};

export default async function CartPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const cartItems: CartItemType[] = await fetchCartItems({
        server: true,
        headers: headers,
    });

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
