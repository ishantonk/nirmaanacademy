import SiteInfo from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Admin | ${SiteInfo.Title}`,
    description: `Manage users, courses, and view analytics of ${SiteInfo.Title}.`,
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Manage users, courses, and view analytics.
                </p>
            </div>

            {children}
        </div>
    );
}
