import { PostCard } from "@/components/blog/post-card";
import { PostCardSkeleton } from "@/components/blog/post-card-skeleton";
import CourseCard, {
    CourseCardSkeleton,
} from "@/components/course/course-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteInfo from "@/data/contact-info";
import { getAuthSession } from "@/lib/auth";
import { fetchAuthorBlogsAdmin, fetchEnrollments } from "@/lib/services/api";
import { BookOpen, Newspaper } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Dashboard | " + SiteInfo.Title,
    description:
        "Access all the courses you've enrolled in, track your learning progress, and manage your educational journey with ease on your personal dashboard.",
};

export default async function DashboardPage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    const [enrollments, authorBlogs] = await Promise.all([
        fetchEnrollments(),
        fetchAuthorBlogsAdmin(),
    ]);

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Manage your courses and blogs.
                </p>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="courses" className="space-y-6">
                {/* Tabs List */}
                <TabsList>
                    <TabsTrigger value="courses">Your Courses</TabsTrigger>
                    <TabsTrigger value="blogs">Your Blogs</TabsTrigger>
                </TabsList>

                {/* Courses Tab */}
                <TabsContent value="courses">
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            {enrollments.map(
                                (enroll) =>
                                    enroll.course && (
                                        <Suspense
                                            key={enroll.course.id}
                                            fallback={<CourseCardSkeleton />}
                                        >
                                            <CourseCard
                                                course={enroll.course}
                                            />
                                        </Suspense>
                                    )
                            )}
                        </div>
                    )}
                </TabsContent>

                {/* Blogs Tab */}
                <TabsContent value="blogs">
                    {authorBlogs.length === 0 ? (
                        <EmptyState
                            icon={Newspaper}
                            title="No blogs found"
                            description="You haven't posted or saved any blogs yet."
                            action={
                                <Button asChild>
                                    <Link href="/blogs">Browse Blogs</Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {/* Map your blogs here */}
                            {authorBlogs.map((blog) => (
                                <Suspense
                                    key={blog.id}
                                    fallback={PostCardSkeleton()}
                                >
                                    <PostCard {...blog} />
                                </Suspense>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
