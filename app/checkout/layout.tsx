import { brandName } from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Checkout | ${brandName}`,
    description: `Review your order summary and securely complete your payment to enroll in your selected courses at ${brandName}.`,
    keywords: [
        "Checkout",
        "Payment",
        "Enroll",
        "Courses",
        `${brandName}`,
        "Secure Payment",
    ],
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Review your order and provide payment details to complete
                    your enrollment.
                </p>
            </div>

            <div className="flex flex-col">{children}</div>
        </div>
    );
}
