import { CourseCard } from "@/components/course/course-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { brandName } from "@/data/contact-info";
import { getAuthSession } from "@/lib/auth";
import { fetchEnrollments } from "@/lib/fetch";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Dashboard | " + brandName,
    description:
        "Access all the courses you've enrolled in, track your learning progress, and manage your educational journey with ease on your personal dashboard.",
};

export default async function DashboardPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const enrollments = await fetchEnrollments({
        server: true,
        headers: headers,
    });

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    View your purchased or enrolled courses.
                </p>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl lg:text-xl font-semibold mb-4">
                    Your Courses
                </h2>
            </div>

            {/* Course grid */}
            {enrollments.length === 0 ? (
                <EmptyState
                    icon={BookOpen}
                    title="No courses found"
                    description="You haven't enrolled in any courses yet. Browse our courses to get started."
                    action={
                        <Button asChild>
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                    }
                />
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {enrollments.map((enroll) => {
                        if (enroll.course)
                            return (
                                // Todo: change or create new for dashboard
                                <CourseCard
                                    key={enroll.course?.id}
                                    course={enroll.course}
                                />
                            );
                    })}
                </div>
            )}
        </div>
    );
}
