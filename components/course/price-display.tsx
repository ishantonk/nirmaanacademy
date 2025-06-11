import type { Decimal } from "@prisma/client/runtime/library";
import { Badge } from "@/components/ui/badge";
import { getDiscountPercent } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

interface PriceDisplayProps {
    price: number | Decimal;
    discountPrice?: number | Decimal | null;
}

/**
 * Displays price, discount and original price if applicable.
 */
export default function PriceDisplay({
    price,
    discountPrice,
}: PriceDisplayProps) {
    if (discountPrice) {
        const discountPercent = getDiscountPercent(price, discountPrice, 1);
        return (
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                    {formatPrice(discountPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(price)}
                </span>
                <Badge
                    variant="destructive"
                    className="bg-destructive/20 text-destructive rounded"
                >
                    {discountPercent}
                </Badge>
            </div>
        );
    }

    return (
        <span className="text-xl font-bold text-primary">
            {formatPrice(price)}
        </span>
    );
}
