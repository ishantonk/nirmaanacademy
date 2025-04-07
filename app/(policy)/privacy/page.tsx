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
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">
                        {privacyPolicyData.title}
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated:{" "}
                        {privacyPolicyData.contact_information.last_updated}
                    </p>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg">{privacyPolicyData.introduction}</p>
                    <p>{privacyPolicyData.scope}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Information We Collect
                    </h2>
                    <p>
                        {
                            privacyPolicyData.information_we_collect
                                .website_visitors
                        }
                    </p>
                    <p>
                        {
                            privacyPolicyData.information_we_collect
                                .third_party_signin
                        }
                    </p>

                    <h3 className="text-xl font-semibold mt-4">
                        Personal Information
                    </h3>
                    <ul className="list-disc pl-6">
                        {privacyPolicyData.information_we_collect.personal_information.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        How We Use Information
                    </h2>
                    <ul className="list-disc pl-6">
                        {privacyPolicyData.how_we_use_information.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Data Security
                    </h2>
                    <ul className="list-disc pl-6">
                        {privacyPolicyData.data_security.measures.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4">
                        {privacyPolicyData.data_security.disclaimer}
                    </p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Advertisements and Tracking
                    </h2>
                    <p>{privacyPolicyData.advertisements_tracking}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Third-Party Links and Services
                    </h2>
                    <p>{privacyPolicyData.third_party_links_services}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Disclosure of Information
                    </h2>
                    <ul className="list-disc pl-6">
                        {privacyPolicyData.disclosure_of_information.cases.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8">
                        Data Retention Policy
                    </h2>
                    <p>{privacyPolicyData.data_retention_policy}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Cookies and Tracking
                    </h2>
                    <p>{privacyPolicyData.cookies_tracking}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Children&apos;s Privacy
                    </h2>
                    <p>{privacyPolicyData.children_privacy}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        E-commerce Transactions
                    </h2>
                    <p>{privacyPolicyData.ecommerce_transactions}</p>

                    <h2 className="text-2xl font-semibold mt-8">
                        User Rights and Choices
                    </h2>
                    <ul className="list-disc pl-6">
                        {privacyPolicyData.user_rights_choices.rights.map(
                            (item, index) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4">
                        {privacyPolicyData.user_rights_choices.contact}
                    </p>

                    <h2 className="text-2xl font-semibold mt-8">
                        Policy Updates
                    </h2>
                    <p>{privacyPolicyData.policy_updates}</p>
                </div>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p>
                            Email: {privacyPolicyData.contact_information.email}
                        </p>
                        <p>
                            Phone: {privacyPolicyData.contact_information.phone}
                        </p>
                        <p>
                            Address:{" "}
                            {privacyPolicyData.contact_information.address}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
