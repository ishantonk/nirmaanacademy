import { Metadata } from "next";
import { fetchFaculties } from "@/lib/fetch";
import { FacultyCard } from "@/components/faculty/faculty-card";

export const metadata: Metadata = {
    title: "Our Faculty - Nirmaan Academy",
    description:
        "Meet our expert instructors who are passionate about teaching business and corporate law.",
};

export default async function FacultyPage() {
    const faculties = await fetchFaculties();

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Our Expert Faculties
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Learn from experienced professionals in business law,
                    corporate governance, and finance law.
                </p>
            </div>

            {/* Faculty Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {faculties.map((faculty) => (
                    <FacultyCard key={faculty.id} faculty={faculty} />
                ))}
            </div>
        </div>
    );
}
