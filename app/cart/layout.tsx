import { brandName } from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart | " + brandName,
    description: "Your shopping cart",
};

export default async function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Shopping Cart
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    View your courses in cart.
                </p>
            </div>

            {children}
        </div>
    );
}
