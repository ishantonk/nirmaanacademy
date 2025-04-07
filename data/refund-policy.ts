import { brandName, contactInfo } from "./contact-info";

export const refundPolicyData = {
    title: "Return and Refund Policy for " + brandName,
    overview:
        "At Nirmaan Academy, we are committed to ensuring customer satisfaction with our educational services and products. This Return and Refund Policy outlines the terms under which refunds may be granted for purchased courses, study materials, and other digital content.",
    refund_eligibility: {
        request_period:
            "Refund requests must be made within 7 days of the original purchase date.",
        completion_limit:
            "Refunds will only be issued if the course or material has not been completed beyond 20% of its content.",
        purchase_condition:
            "Refunds are applicable only to courses and materials purchased directly through Nirmaan Academy. Purchases made through third-party platforms are subject to their refund policies.",
        subscription_policy:
            "Subscription-based services may be canceled at any time, but refunds will not be issued for partial or unused subscription periods.",
    },
    non_refundable_items: [
        "Downloadable study materials, e-books, PDFs, and other digital resources.",
        "One-on-one tutoring sessions or live classes that have already been attended.",
        "Courses purchased during promotional offers, discounts, or bundled deals.",
        "Any service that has been explicitly marked as non-refundable at the time of purchase.",
    ],
    refund_request_process: {
        submission:
            "Users must submit a refund request via email at " + contactInfo.email + " with the following details:",
        required_details: [
            "Full name",
            "Order ID or receipt number",
            "Reason for the refund request",
            "Any relevant screenshots or supporting information",
        ],
        review_timeline:
            "Our support team will review the request within 5-7 business days and determine eligibility.",
        refund_processing:
            "If approved, the refund will be processed to the original payment method within 7-14 business days.",
    },
    course_cancellations_and_subscriptions: {
        subscription_cancellation:
            "Users may cancel a subscription at any time from their account settings.",
        billing_cycle:
            "If cancellation occurs before the next billing cycle, users will retain access until the end of the current cycle but will not receive a refund.",
        billing_errors:
            "Refunds for subscription-based services will be considered only if a billing error has occurred on our part.",
    },
    technical_issues: {
        reporting:
            "If a user is unable to access a purchased course due to technical errors on our platform, they must report the issue to our support team.",
        refund_eligibility:
            "Refunds may be issued if the issue remains unresolved within 72 hours of reporting.",
        device_incompatibility:
            "Users experiencing issues due to personal device incompatibility will not be eligible for a refund.",
    },
    fraud_and_abuse_policy: {
        fraudulent_requests:
            "Nirmaan Academy reserves the right to deny refund requests that appear to be fraudulent or abusive.",
        account_suspension:
            "Users found repeatedly requesting refunds while continuing to access courses may have their accounts suspended or terminated.",
    },
    policy_updates:
        "Nirmaan Academy may update this policy at any time. Users are encouraged to review it periodically. Continued use of Nirmaan Academy after policy updates constitutes acceptance of the revised terms.",
    contact_information: {
        email: contactInfo.email,
        phone: contactInfo.phone,
    },
};