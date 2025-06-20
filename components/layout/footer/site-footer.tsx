import Link from "next/link";
import SiteInfo from "@/data/contact-info";
import { DeveloperProfile } from "@/data/links-name";
import { FooterLogoAndInfo } from "@/components/layout/footer/footer-logo-and-info";
import { FooterNav } from "@/components/layout/footer/footer-nav";
import { FooterNewsletter } from "@/components/layout/footer/footer-newsletter";
import { FooterVisitorsCount } from "./footer-visitors-count";

export function SiteFooter() {
    return (
        <footer className="border-t bg-primary/10">
            <div className="container py-8 md:py-12 mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-6">
                    <div className="md:col-span-2 flex flex-col justify-between">
                        <FooterLogoAndInfo />
                    </div>
                    <FooterNav heading="Platform" links={platformLinks} />
                    <FooterNav heading="Legal" links={legalLinks} />
                    <div className="md:col-span-2 flex flex-col justify-between lg:items-end space-y-4">
                        <FooterNewsletter />
                        <FooterVisitorsCount />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 bg-primary p-4 px-12 text-center text-sm text-primary-foreground space-x-1 mb-14 md:mb-0">
                <p>
                    © {new Date().getFullYear()} {SiteInfo.Title}. All rights
                    reserved.
                </p>
                <p>
                    Designed & Developed by{" "}
                    <Link
                        href={DeveloperProfile.github}
                        className="text-neutral-300 hover:underline"
                    >
                        {DeveloperProfile.name}
                    </Link>
                </p>
            </div>
        </footer>
    );
}

const platformLinks = [
    {
        href: "/courses",
        label: "Courses",
    },
    {
        href: "/blogs",
        label: "Blogs",
    },
    {
        href: "/about",
        label: "About Us",
    },
    {
        href: "/faq",
        label: "FAQs",
    },
    {
        href: "/contact",
        label: "Contact",
    },
    {
        href: "/cart",
        label: "Cart",
    },
];

const legalLinks = [
    {
        href: "/privacy",
        label: "Privacy Policy",
    },
    {
        href: "/refund",
        label: "Refund & Return Policy",
    },
    {
        href: "/cookie",
        label: "Cookie Policy",
    },
    {
        href: "/terms",
        label: "Terms of Service",
    },
];
