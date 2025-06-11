import SectionHeading from "@/components/home/section-heading";
import { fetchFaculties } from "@/lib/services/api";
import SectionCarousel from "@/components/home/section-carousel";
import { FacultyCard } from "@/components/faculty/faculty-card";

export async function FacultySection() {
    const faculties = await fetchFaculties();
    const facultiesItems = faculties.map((faculty, idx) => (
        <FacultyCard faculty={faculty} key={faculty.id || idx} />
    ));

    return (
        <section className="bg-gradient-to-tr from-background via-background to-primary/50 py-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <SectionHeading
                    title="Our Expert Faculties"
                    description="Learn from experienced professionals in business
                            law, corporate governance, and finance law."
                    buttonLink={{
                        label: "View All Faculties",
                        link: "/faculty",
                    }}
                />

                {/* carousel */}
                <SectionCarousel autoplay items={facultiesItems} />
            </div>
        </section>
    );
}
