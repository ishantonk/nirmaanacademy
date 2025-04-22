"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { CartItemType } from "@/lib/types";
import { Card, CardImage } from "@/components/ui/card";
import { removeCartItem } from "@/lib/services/api";

export function CartItemCard({ item }: { item: CartItemType }) {
    const router = useRouter();

    const { mutate: removeFromCart, isPending } = useMutation({
        mutationFn: async () =>
            await removeCartItem({ itemId: item.id }),
        onSuccess: () => {
            toast.success("Removed from cart", {
                description: "The course has been removed from your cart.",
            });
            router.refresh();
        },
        onError: (error) => {
            toast.error("Something went wrong", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to remove from cart",
            });
        },
    });

    if (!item.course) return null;

    // Extract and normalize prices
    const price = Number(item.course.price);
    const discountPrice = Number(item.course.discountPrice);
    const isOnSale =
        item.course.onSale && discountPrice && price && discountPrice < price;

    return (
        <Card className="flex-row gap-4 p-4">
            <CardImage
                className="h-24 rounded-md"
                thumbnail={item.course.thumbnail ?? ""}
                title={item.course.title}
            />
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-medium">
                        <Link href={`/courses/${item.course.slug}`}>
                            {item.course.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        By {item.course.faculties?.[0].name}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        {isOnSale ? (
                            <span className="flex items-center gap-2">
                                <span>{formatPrice(discountPrice)}</span>
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(price)}
                                </span>
                            </span>
                        ) : (
                            <span>{formatPrice(Number(price))}</span>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart()}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash className="h-4 w-4" />
                        )}
                        <span className="sr-only">Remove from cart</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
