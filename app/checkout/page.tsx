import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { getAuthSession } from "@/lib/auth";
import { fetchCartItems } from "@/lib/fetch";

export default async function CheckoutPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const cartItems = await fetchCartItems({ server: true, headers: headers });

    if (cartItems.length === 0) {
        redirect("/courses");
    }

    const total = cartItems.reduce((acc, item) => {
        if (!item.course) return 0;
        let price = item.course.price;
        if (item.course.onSale) {
            price = item.course.discountPrice ?? item.course.price;
        }
        return acc + Number(price);
    }, 0);

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CheckoutOrderSummary cartItems={cartItems} />

            <CheckoutForm amount={total} />
        </div>
    );
}
