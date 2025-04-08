import { brandName } from "@/data/contact-info";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search | " + brandName,
    description: "Search all courses and categories",
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Search Courses</h1>

            <div className="flex flex-col gap-6">{children}</div>
        </div>
    );
}
