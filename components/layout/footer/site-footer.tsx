import Link from "next/link";
import { brandName } from "@/data/contact-info";
import { APP_ROUTES } from "@/data/routes-names";
import { DeveloperProfile } from "@/data/links-name";
import { FooterLogoAndInfo } from "@/components/layout/footer/footer-logo-and-info";
import { FooterNav } from "@/components/layout/footer/footer-nav";
import { FooterNewsletter } from "@/components/layout/footer/footer-newsletter";

export function SiteFooter() {
    return (
        <footer className="border-t bg-primary/10">
            <div className="container py-8 md:py-12 mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <FooterLogoAndInfo />
                    <FooterNav heading="Platform" links={platformLinks} />
                    <FooterNav heading="Legal" links={legalLinks} />
                    <FooterNewsletter />
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 border-t p-4 text-center text-sm text-muted-foreground space-x-1 mb-14 md:mb-0">
                <p>
                    © {new Date().getFullYear()} {brandName}. All rights
                    reserved.
                </p>
                <p>
                    Designed & Developed by{" "}
                    <Link
                        href={DeveloperProfile.github}
                        className="text-primary hover:underline"
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
        href: APP_ROUTES.courses,
        label: "Courses",
    },
    {
        href: APP_ROUTES.blogs,
        label: "Blogs",
    },
    {
        href: APP_ROUTES.aboutUs,
        label: "About Us",
    },
    {
        href: APP_ROUTES.contact,
        label: "Contact",
    },
    {
        href: APP_ROUTES.cart,
        label: "Cart",
    },
];

const legalLinks = [
    {
        href: APP_ROUTES.privacyPolicy,
        label: "Privacy Policy",
    },
    {
        href: APP_ROUTES.refundPolicy,
        label: "Refund & Return Policy",
    },
    {
        href: APP_ROUTES.cookiePolicy,
        label: "Cookie Policy",
    },
    {
        href: APP_ROUTES.termsOfService,
        label: "Terms of Service",
    },
];
