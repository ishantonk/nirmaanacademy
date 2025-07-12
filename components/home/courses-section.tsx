import SectionHeading from "@/components/home/section-heading";
import SectionCarousel from "@/components/home/section-carousel";
import { fetchCourses } from "@/lib/services/api";
import CourseCard from "../course/course-card";
import { CourseType } from "@/lib/types";

export async function CoursesSection() {
    const params = new URLSearchParams();
    params.append("count", "8");
    params.append("featured", "true");
    const queryString = params.toString();

    let courses: Array<CourseType> = [];
    try {
        courses = await fetchCourses(queryString);
    } catch (error) {
        console.error("Failed to fetch courses:", error);
    }

    const courseItems = courses.map((course, idx) => (
        <CourseCard key={course.id || idx} course={course} />
    ));

    return (
        <section className="bg-gradient-to-tl from-primary/50 via-background to-background py-8">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <SectionHeading
                    title="Featured Courses"
                    description="Explore our most popular and highly-rated courses."
                    buttonLink={{
                        label: "View All Courses",
                        link: "/courses",
                    }}
                />

                {/* carousel */}
                <SectionCarousel
                    autoplay
                    itemsPerView={{
                        mobile: 1,
                    }}
                    items={courseItems}
                />
            </div>
        </section>
    );
}
