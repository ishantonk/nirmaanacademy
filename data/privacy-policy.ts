import SiteInfo, { contactInfo } from "./contact-info";

export const privacyPolicyData = {
    title: "Privacy Policy",
    organization: SiteInfo.Title,
    introduction:
        "Welcome to Nirmaan Academy. Your privacy is critically important to us. Nirmaan Academy is committed to respecting and protecting your privacy regarding any information we may collect while operating our website.",
    scope: "This Privacy Policy applies to www.nirmaanacademy.com and outlines how we collect, use, and safeguard your information.",
    information_we_collect: {
        website_visitors:
            "Nirmaan Academy collects non-personally identifiable information such as browser type, language preference, referring site, and date/time of each visitor request.",
        personal_information: [
            "Full Name",
            "Email Address",
            "Phone Number",
            "Mailing Address (if applicable)",
            "Payment details for course enrollment",
            "User account credentials",
            "Profile information such as preferences and interests related to educational content",
        ],
        third_party_signin:
            "If users sign in using third-party services such as Google or Facebook, we may collect basic profile information with their consent.",
    },
    how_we_use_information: [
        "Provide, operate, and maintain our website",
        "Personalize user experience by offering tailored courses and recommendations",
        "Process transactions and manage course enrollments",
        "Provide customer support and respond to inquiries",
        "Send promotional and administrative emails",
        "Conduct market research and analysis",
        "Improve website performance and content",
        "Prevent fraudulent activities and secure user data",
    ],
    data_security: {
        measures: [
            "SSL encryption for secure data transmission",
            "Restricted access to personal data by authorized personnel only",
            "Regular security audits and vulnerability assessments",
            "Secure payment processing through third-party payment gateways",
        ],
        disclaimer:
            "No method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.",
    },
    advertisements_tracking:
        "Ads on our website may use cookies, web beacons, or similar technologies to track online activities and display targeted advertisements.",
    third_party_links_services:
        "Our website may contain links to external sites, where their own Privacy Policy will apply. We are not responsible for third-party privacy practices.",
    disclosure_of_information: {
        cases: [
            "To employees, contractors, and trusted partners who require access to process transactions or provide educational services",
            "When required by law, court order, or government request",
            "To protect the rights, safety, and security of Nirmaan Academy, its users, and the public",
            "In case of business transfer, merger, or acquisition, where user data may be transferred",
        ],
    },
    data_retention_policy:
        "We retain personal information only as long as necessary to fulfill outlined purposes, after which data is anonymized or securely deleted unless legally required.",
    cookies_tracking:
        "To enhance browsing experience, we use cookies for session tracking, secure transactions, and personalized course recommendations. Users can control cookie settings via browser preferences.",
    children_privacy:
        "Nirmaan Academy does not knowingly collect personal information from children under 13. Parents can request data removal if a child has provided personal information.",
    ecommerce_transactions:
        "Purchases are processed securely through third-party payment gateways. We do not store sensitive payment details such as credit card numbers.",
    user_rights_choices: {
        rights: [
            "Access, update, or delete personal information",
            "Opt out of marketing communications",
            "Withdraw consent for data processing (where applicable)",
            "Request a copy of personal data",
        ],
        contact:
            "Users can exercise these rights by contacting support@nirmaanacademy.com.",
    },
    policy_updates:
        "Nirmaan Academy may update this Privacy Policy periodically. Continued use of our website after updates constitutes acceptance of the revised policy.",
    contact_information: {
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address,
        last_updated: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    },
};
