import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemType } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function CheckoutOrderSummary({
    cartItems,
}: {
    cartItems: CartItemType[];
}) {
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
                <CardTitle>
                    <h2>Order Summary</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="divide-y">
                    {cartItems.map(
                        (item) =>
                            item.course && (
                                <li
                                    key={item.id}
                                    className="py-4 first:pt-0 last:pb-0"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-medium">
                                                {item.course.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.course.category?.name ||
                                                    "Uncategorized"}
                                            </p>
                                        </div>
                                        <p className="font-medium text-muted-foreground">
                                            {formatPrice(
                                                Number(item.course.price)
                                            )}
                                        </p>
                                    </div>
                                </li>
                            )
                    )}
                </ul>

                <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
