import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { EmptyState } from "@/components/ui/empty-state";
import { APP_ROUTES } from "@/data/routes-names";
import { brandName } from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Shopping Cart | " + brandName,
    description: "Your shopping cart",
};

export default async function CartPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect(APP_ROUTES.login);
    }

    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            course: {
                include: {
                    instructor: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.course.discountPrice ?? item.course.price;
        return acc + Number(price);
    }, 0);

    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="mt-8">
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
            ) : (
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} item={item} />
                        ))}
                    </div>

                    <div>
                        <div className="rounded-lg border p-6 shadow-sm">
                            <h2 className="text-lg font-medium">
                                Order Summary
                            </h2>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        Subtotal
                                    </span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between font-medium">
                                    <span>Total</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <Button asChild className="w-full">
                                    <Link href={APP_ROUTES.checkout}>Checkout</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
