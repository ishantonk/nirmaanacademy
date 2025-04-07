import { brandName } from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping Cart | " + brandName,
    description: "Your shopping cart",
};


export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            {children}
        </div>
    );
}