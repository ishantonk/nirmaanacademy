import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItemType, CourseType } from "@/lib/types";
import { formatPrice } from "@/lib/format";

interface CartProps {
    type: "cart";
    items: CartItemType[];
}

interface CourseProps {
    type: "course";
    course: CourseType;
}

type CheckoutOrderSummaryProps = CartProps | CourseProps;

export function CheckoutOrderSummary(props: CheckoutOrderSummaryProps) {
    // Compute total
    let total: number;
    if (props.type === "cart") {
        total = props.items.reduce((sum, item) => {
            if (!item.course) return sum;
            const price = item.course.onSale
                ? Number(item.course.discountPrice ?? item.course.price)
                : Number(item.course.price);
            return sum + price;
        }, 0);
    } else {
        // Single course
        const c = props.course;
        total = c.onSale ? Number(c.discountPrice ?? c.price) : Number(c.price);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="divide-y">
                    {props.type === "cart" ? (
                        // Render each cart item
                        props.items.map((item) => {
                            if (!item.course) return null;
                            const { course } = item;
                            const displayPrice = course.onSale
                                ? Number(course.discountPrice ?? course.price)
                                : Number(course.price);
                            return (
                                <li
                                    key={item.id}
                                    className="py-4 first:pt-0 last:pb-0 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {course.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {course.category?.name ??
                                                "Uncategorized"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {course.onSale &&
                                        course.discountPrice != null ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600">
                                                    {formatPrice(displayPrice)}
                                                </span>
                                                <span className="text-sm line-through text-muted-foreground">
                                                    {formatPrice(
                                                        Number(course.price)
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="font-medium text-muted-foreground">
                                                {formatPrice(displayPrice)}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        // Render single course
                        <li className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                            <div>
                                <p className="font-medium">
                                    {props.course.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {props.course.category?.name ??
                                        "Uncategorized"}
                                </p>
                            </div>
                            <div className="font-medium text-muted-foreground">
                                {formatPrice(total)}
                            </div>
                        </li>
                    )}
                </ul>

                <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
