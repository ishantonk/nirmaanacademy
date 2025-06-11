import SiteInfo from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search | " + SiteInfo.Title,
    description: "Search all courses and categories",
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Search Courses
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Find courses by name, category, description.
                </p>
            </div>

            <div className="flex flex-col gap-6">{children}</div>
        </div>
    );
}
