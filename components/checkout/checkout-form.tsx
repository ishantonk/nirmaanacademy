"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { formatPrice } from "@/lib/format";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
    amount: number;
}

export function CheckoutForm({ amount }: CheckoutFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).Razorpay) {
            setRazorpayLoaded(true);
        }
    }, []);

    async function onSubmit(data: FormValues) {
        try {
            setIsLoading(true);

            // Create order on server
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                    name: data.name,
                    email: data.email,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const orderData = await response.json();

            if (!razorpayLoaded) {
                throw new Error("Razorpay SDK not loaded");
            }

            // Initialize Razorpay payment
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "EduLearn",
                description: "Course Purchase",
                order_id: orderData.razorpayOrderId,
                handler: async (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        // Verify payment on server
                        const verifyResponse = await fetch(
                            "/api/checkout/verify",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    orderId: orderData.id,
                                    paymentId: response.razorpay_payment_id,
                                    signature: response.razorpay_signature,
                                }),
                            }
                        );

                        if (!verifyResponse.ok) {
                            throw new Error("Payment verification failed");
                        }

                        toast.success("Payment successful", {
                            description:
                                "Your order has been placed successfully",
                        });

                        // Redirect to success page
                        router.push("/checkout/success");
                    } catch {
                        toast.error("Payment verification failed", {
                            description: "Please contact support",
                        });
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                },
                theme: {
                    color: "#6366F1",
                },
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch {
            toast.error("Something went wrong", {
                description: "Failed to process payment. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setRazorpayLoaded(true)}
            />

            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="john@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Processing..."
                            : `Pay ${formatPrice(amount)}`}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
