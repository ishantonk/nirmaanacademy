import { Metadata } from "next";
import Link from "next/link";
import { fetchFaculties } from "@/lib/fetch";
import { FacultyCard } from "@/components/faculty/faculty-card";

export const metadata: Metadata = {
    title: "Our Faculty - Nirmaan Academy",
    description:
        "Meet our expert instructors who are passionate about teaching business and corporate law.",
};

export default async function InstructorsPage() {
    const faculties = await fetchFaculties();

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">
                    Our Expert Faculties
                </h1>
                <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                    Learn from experienced professionals in business law,
                    corporate governance, and finance law.
                </p>
            </div>

            {/* Faculty Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {faculties.map((faculty) => (
                    <Link key={faculty.id} href={`/faculty/`}>
                        <FacultyCard faculty={faculty} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
