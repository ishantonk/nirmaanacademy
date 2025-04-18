import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

export function AdminOverviewCard() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Total Revenue</CardTitle>
                <Users className="w-4 h-4 opacity-60" />
            </CardHeader>
            <CardContent>
                <span className="font-bold text-2xl">{formatPrice(20000)}</span>
            </CardContent>
        </Card>
    );
}
