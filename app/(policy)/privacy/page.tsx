import { Metadata } from "next";
import { privacyPolicyData } from "@/data/privacy-policy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brandName } from "@/data/contact-info";

export const metadata: Metadata = {
    title: `${privacyPolicyData.title} | ${brandName}`,
    description: brandName,
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">
                        {privacyPolicyData.title}
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated:{" "}
                        {privacyPolicyData.contact_information.last_updated}
                    </p>
                </div>

                {/* Introduction and Scope */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg font-semibold text-muted-foreground">
                        {privacyPolicyData.introduction}
                    </p>
                    <p className="text-muted-foreground">{privacyPolicyData.scope}</p>

                    {/* Information We Collect */}
                    <h2 className="text-2xl font-semibold mt-8 text-blue-600">
                        Information We Collect
                    </h2>
                    <p className="text-muted-foreground">
                        {
                            privacyPolicyData.information_we_collect
                                .website_visitors
                        }
                    </p>
                    <p className="text-muted-foreground">
                        {
                            privacyPolicyData.information_we_collect
                                .third_party_signin
                        }
                    </p>

                    <h3 className="text-xl font-semibold mt-4 text-green-600">
                        Personal Information
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                        {privacyPolicyData.information_we_collect.personal_information.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    {/* How We Use Information */}
                    <h2 className="text-2xl font-semibold mt-8 text-orange-600">
                        How We Use Information
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                        {privacyPolicyData.how_we_use_information.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    {/* Data Security */}
                    <h2 className="text-2xl font-semibold mt-8 text-red-600">
                        Data Security
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                        {privacyPolicyData.data_security.measures.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                        {privacyPolicyData.data_security.disclaimer}
                    </p>

                    {/* Advertisements and Tracking */}
                    <h2 className="text-2xl font-semibold mt-8 text-purple-600">
                        Advertisements and Tracking
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.advertisements_tracking}
                    </p>

                    {/* Third-Party Links and Services */}
                    <h2 className="text-2xl font-semibold mt-8 text-teal-600">
                        Third-Party Links and Services
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.third_party_links_services}
                    </p>

                    {/* Disclosure of Information */}
                    <h2 className="text-2xl font-semibold mt-8 text-pink-600">
                        Disclosure of Information
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                        {privacyPolicyData.disclosure_of_information.cases.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    {/* Data Retention Policy */}
                    <h2 className="text-2xl font-semibold mt-8 text-yellow-600">
                        Data Retention Policy
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.data_retention_policy}
                    </p>

                    {/* Cookies and Tracking */}
                    <h2 className="text-2xl font-semibold mt-8 text-indigo-600">
                        Cookies and Tracking
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.cookies_tracking}
                    </p>

                    {/* Children's Privacy */}
                    <h2 className="text-2xl font-semibold mt-8 text-gray-600">
                        Children&apos;s Privacy
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.children_privacy}
                    </p>

                    {/* E-commerce Transactions */}
                    <h2 className="text-2xl font-semibold mt-8 text-blue-600">
                        E-commerce Transactions
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.ecommerce_transactions}
                    </p>

                    {/* User Rights and Choices */}
                    <h2 className="text-2xl font-semibold mt-8 text-green-600">
                        User Rights and Choices
                    </h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                        {privacyPolicyData.user_rights_choices.rights.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4 text-muted-foreground">
                        {privacyPolicyData.user_rights_choices.contact}
                    </p>

                    {/* Policy Updates */}
                    <h2 className="text-2xl font-semibold mt-8 text-purple-600">
                        Policy Updates
                    </h2>
                    <p className="text-muted-foreground">
                        {privacyPolicyData.policy_updates}
                    </p>
                </div>

                {/* Contact Information Card */}
                <Card className="mt-8 bg-muted">
                    <CardHeader>
                        <CardTitle className="text-teal-600">
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-muted-foreground">
                            Email: {privacyPolicyData.contact_information.email}
                        </p>
                        <p className="text-muted-foreground">
                            Phone: {privacyPolicyData.contact_information.phone}
                        </p>
                        <p className="text-muted-foreground">
                            Address:{" "}
                            {privacyPolicyData.contact_information.address}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
