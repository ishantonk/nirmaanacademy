"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/app/checkout/loading";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { fetchCartItems } from "@/lib/fetch";
import { CartItemType } from "@/lib/types";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    // Local state for cart items, total amount, and loading flag.
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wait until the session is loaded
        if (status === "loading") return;

        // If no session is found, redirect to login.
        if (!session) {
            router.push("/login?callbackUrl=/checkout");
            return;
        }

        // Fetch the cart items client-side.
        async function loadCart() {
            try {
                // Pass any required parameters to fetchCartItems.
                const items = await fetchCartItems({ server: false });

                // If there are no items, redirect to the courses page.
                if (!Array.isArray(items) || items.length === 0) {
                    router.push("/courses");
                    return;
                }

                // Update the cart items state.
                setCartItems(items);

                // Calculate the total.
                const computedTotal = items.reduce((acc, item) => {
                    if (!item.course) return acc;
                    // Use discountPrice if course is on sale.
                    let price = item.course.price;
                    if (item.course.onSale) {
                        price = item.course.discountPrice ?? item.course.price;
                    }
                    return acc + Number(price);
                }, 0);
                setTotal(computedTotal);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadCart();
    }, [session, status, router]);

    // While loading data, display a loading message.
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CheckoutOrderSummary type="cart" items={cartItems} />
            <CheckoutForm type="cart" amount={total} />
        </div>
    );
}
