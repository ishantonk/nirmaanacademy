import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { CartItemType } from "@/lib/types";
import { CartOrderSummary } from "@/components/cart/cart-order-summary";
import { CartItemList } from "@/components/cart/cart-item-list";

async function getCartItems(): Promise<CartItemType[]> {
    const response = await fetch(`${process.env.DOMAIN}/api/cart`, {
        // Get the request cookies from the server
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
        // Always disable caching for protected fetches
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart items");
    }

    return response.json();
}

export default async function CartPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const cartItems: CartItemType[] = await getCartItems();

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
