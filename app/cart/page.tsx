import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { CartItemType } from "@/lib/types";
import { CartOrderSummary } from "@/components/cart/cart-order-summary";
import { CartItemList } from "@/components/cart/cart-item-list";
import { prisma } from "@/lib/prisma";

export default async function CartPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const cartItems: CartItemType[] = await prisma.cartItem.findMany({
        where: {
            userId: session?.user.id,
        },
        select: {
            id: true,
            courseId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            course: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    price: true,
                    discountPrice: true,
                    thumbnail: true,
                    onSale: true,
                    faculties: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    }).then((items) =>
        items.map((item) => ({
            ...item,
            course: {
                ...item.course,
                price: item.course.price?.toNumber() ?? null,
                discountPrice: item.course.discountPrice?.toNumber() ?? null,
            },
        }))
    );

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
