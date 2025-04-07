"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { serializeDecimal } from "@/lib/utils";
import { CartItemType } from "@/lib/types";

export function CartItemCard({ item }: { item: CartItemType }) {
    const price = serializeDecimal(item.course.price);
    const discountPrice =
        item.course.discountPrice &&
        serializeDecimal(item.course.discountPrice);

    const router = useRouter();

    const { mutate: removeFromCart, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/cart/${item.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to remove from cart");
            }

            return response.json();
        },
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

    return (
        <div className="flex gap-4 rounded-lg border p-4">
            <div className="relative aspect-video h-24 overflow-hidden rounded-md">
                <Image
                    src={
                        item.course.thumbnail ||
                        "/placeholder.svg?height=96&width=170"
                    }
                    alt={item.course.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-medium">
                        <Link
                            href={`/courses/${item.course.slug}`}
                            className="hover:underline"
                        >
                            {item.course.title}
                        </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        By {item.course.faculties?.[0].name}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="font-medium">
                        {item.course.onSale &&
                        discountPrice &&
                        price &&
                        discountPrice < price ? (
                            <span className="flex items-center gap-2">
                                <span>{formatPrice(discountPrice)}</span>
                                <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(price)}
                                </span>
                            </span>
                        ) : (
                            <span>{formatPrice(price ? price : 0)}</span>
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
        </div>
    );
}
