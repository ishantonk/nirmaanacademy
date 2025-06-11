import { Metadata } from "next";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faq";
import SiteInfo from "@/data/contact-info";

export const metadata: Metadata = {
    title: faqData.title,
    description: faqData.description,
};

export default function FAQPage() {
    return (
        <div className="container mx-auto py-10 space-y-16 px-4">
            {/* Hero Section */}
            <div className="lg:text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    {faqData.tagline} related to {SiteInfo.Title}
                </p>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto lg:text-center">
                <p className="text-lg text-muted-foreground">
                    {faqData.description}
                </p>
            </div>

            {/* FAQs - Accordion Style */}
            <div className="max-w-4xl mx-auto">
                <Accordion type="multiple" className="space-y-4">
                    {faqData.faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                        >
                            <AccordionTrigger className="flex justify-between items-center bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4 font-semibold text-lg text-gray-800 hover:bg-indigo-200 transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-gray-600 bg-white">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Contact Section */}
            <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold text-primary">
                    Still Have Questions?
                </h2>
                <div className="text-muted-foreground space-y-2">
                    <p className="text-gray-600">{faqData.contact.address}</p>
                    <p className="text-gray-600">{faqData.contact.email}</p>
                    <p className="text-gray-600">{faqData.contact.phone}</p>
                </div>
            </div>
        </div>
    );
}
