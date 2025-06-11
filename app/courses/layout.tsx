import SiteInfo from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Courses | " + SiteInfo.Title,
    description: "Browse all courses",
};

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4 bg-background">
            {children}
        </div>
    );
}
