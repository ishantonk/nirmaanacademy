"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import SiteInfo from "@/data/contact-info";
import { OrderType } from "@/lib/types";
import { useSession } from "next-auth/react";

/**
 * Define the schema for checkout form validation.
 */
const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface CartProps {
    type: "cart";
    amount: number;
}

interface CourseProps {
    type: "course";
    courseId: string;
    amount: number;
}

type CheckoutFormProps = CartProps | CourseProps;

/**
 * CheckoutForm Component:
 * - Displays payment details form.
 * - Creates an order on the server.
 * - Initializes Razorpay with the order details.
 * - Handles payment verification and redirects on success.
 */
export function CheckoutForm(props: CheckoutFormProps) {
    const amount = props.amount;
    const courseId = props.type === "course" ? props.courseId : "";

    const router = useRouter();
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Initialize React Hook Form with zod validation.
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    // Load Razorpay SDK script if it's not already loaded.
    useEffect(() => {
        // Check on the client if Razorpay is available (window.Razorpay exists)
        if (typeof window !== "undefined" && window.Razorpay) {
            setRazorpayLoaded(true);
        }
    }, []);

    // Populate form with session data.
    useEffect(() => {
        if (session) {
            form.reset({
                name: session.user.name!,
                email: session.user.email!,
            });
        }
    }, [session, form]);

    /**
     * onSubmit:
     * - Creates an order on the server.
     * - Initializes Razorpay with order data.
     * - Defines a payment handler callback to verify the payment.
     */
    async function onSubmit(data: FormValues) {
        try {
            setIsLoading(true);

            // Create order on the server.
            const response = await fetch(
                props.type === "cart" ? "/api/checkout" : "/api/checkout/buy",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body:
                        props.type === "cart"
                            ? JSON.stringify({
                                  amount,
                                  name: data.name,
                                  email: data.email,
                              })
                            : JSON.stringify({
                                  courseId,
                                  amount,
                                  name: data.name,
                                  email: data.email,
                              }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const orderData: OrderType = await response.json();

            if (!razorpayLoaded) {
                throw new Error("Razorpay SDK not loaded");
            }

            // Define Razorpay options.
            // If you encounter a type error with RazorpayOptions, consider augmenting the global types.
            const razorpayOptions: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Ensure environment variable is defined
                amount: Number(orderData.amount), // should be in subunits (e.g., paise)
                currency: "INR",
                name: SiteInfo.Title,
                description: "Course Purchase",
                order_id: orderData.razorpayOrderId!, // order id from Razorpay order creation
                handler: async (response) => {
                    try {
                        // Verify payment on the server.
                        const verifyResponse = await fetch(
                            "/api/checkout/verify",
                            {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-Type": "application/json" },
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

            // Instantiate Razorpay using the global constructor.
            // Ensure that your global type declarations are set for Razorpay.
            if (window.Razorpay) {
                // Type assertion: override types if necessary.
                const RazorpayConstructor = window.Razorpay;
                const razorpayInstance = new RazorpayConstructor(
                    razorpayOptions
                );
                razorpayInstance.open();
            } else {
                throw new Error("Razorpay SDK is not available");
            }
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
            {/* Include Razorpay SDK script */}
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
                    {/* Name Field */}
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

                    {/* Email Field */}
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

                    {/* Submit Button */}
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
