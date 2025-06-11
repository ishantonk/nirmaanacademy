import { Metadata } from "next";
import { refundPolicyData } from "@/data/refund-policy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SiteInfo from "@/data/contact-info";

export const metadata: Metadata = {
    title: `Return and Refund Policy | ${SiteInfo.Title}`,
    description: `Learn about our return and refund policy at ${SiteInfo.Title}. We aim to provide a clear and fair process for refunds, ensuring customer satisfaction while maintaining the integrity of our services.`,
};

export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">
                        {refundPolicyData.title}
                    </h1>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg">{refundPolicyData.overview}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Refund Eligibility
                    </h2>
                    <ul className="list-disc pl-6">
                        <li>
                            {refundPolicyData.refund_eligibility.request_period}
                        </li>
                        <li>
                            {
                                refundPolicyData.refund_eligibility
                                    .completion_limit
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData.refund_eligibility
                                    .purchase_condition
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData.refund_eligibility
                                    .subscription_policy
                            }
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Non-Refundable Items
                    </h2>
                    <ul className="list-disc pl-6">
                        {refundPolicyData.non_refundable_items.map(
                            (item: string, index: number) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Refund Request Process
                    </h2>
                    <p>{refundPolicyData.refund_request_process.submission}</p>
                    <ul className="list-disc pl-6 mt-4">
                        {refundPolicyData.refund_request_process.required_details.map(
                            (detail: string, index: number) => (
                                <li key={index}>{detail}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4">
                        {
                            refundPolicyData.refund_request_process
                                .review_timeline
                        }
                    </p>
                    <p>
                        {
                            refundPolicyData.refund_request_process
                                .refund_processing
                        }
                    </p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Course Cancellations and Subscriptions
                    </h2>
                    <ul className="list-disc pl-6">
                        <li>
                            {
                                refundPolicyData
                                    .course_cancellations_and_subscriptions
                                    .subscription_cancellation
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData
                                    .course_cancellations_and_subscriptions
                                    .billing_cycle
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData
                                    .course_cancellations_and_subscriptions
                                    .billing_errors
                            }
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Technical Issues
                    </h2>
                    <ul className="list-disc pl-6">
                        <li>{refundPolicyData.technical_issues.reporting}</li>
                        <li>
                            {
                                refundPolicyData.technical_issues
                                    .refund_eligibility
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData.technical_issues
                                    .device_incompatibility
                            }
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Fraud and Abuse Policy
                    </h2>
                    <ul className="list-disc pl-6">
                        <li>
                            {
                                refundPolicyData.fraud_and_abuse_policy
                                    .fraudulent_requests
                            }
                        </li>
                        <li>
                            {
                                refundPolicyData.fraud_and_abuse_policy
                                    .account_suspension
                            }
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Policy Updates
                    </h2>
                    <p>{refundPolicyData.policy_updates}</p>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            Email: {refundPolicyData.contact_information.email}
                        </p>
                        <p>
                            Phone: {refundPolicyData.contact_information.phone}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
