import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { CartItemType } from "@/lib/types";

export function CartOrderSummary({ cartItems }: { cartItems: CartItemType[] }) {
    const total = cartItems.reduce((acc, item) => {
        if (!item.course) return 0;
        let price = item.course.price;
        if (item.course.onSale) {
            price = item.course.discountPrice ?? item.course.price;
        }
        return acc + Number(price);
    }, 0);

    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent>
                {cartItems.map((item) => {
                    if (item.course)
                        return (
                            <div
                                className="flex justify-between mb-4"
                                key={item.id}
                            >
                                <span className="line-clamp-1 text-muted-foreground">
                                    {item.course.title}
                                </span>
                                <span>
                                    {formatPrice(
                                        Number(
                                            item.course.onSale
                                                ? item.course.discountPrice ??
                                                      item.course.price
                                                : item.course.price
                                        )
                                    )}
                                </span>
                            </div>
                        );
                })}
                <Separator />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <div className="flex justify-between w-full font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
                <Button
                    asChild={!!total}
                    disabled
                    className="w-full"
                >
                    {total ? (
                        <Link href={"/checkout"}>Checkout</Link>
                    ) : (
                        "Checkout"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
