import { JSX } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export function CourseGrid({ courses }: { courses: JSX.Element[] }) {
    if (courses.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title="No courses found"
                description="Try adjusting your search or filter to find what you're looking for."
                action={
                    <Button asChild>
                        <Link href="/courses">Clear Filters</Link>
                    </Button>
                }
            />
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
            {courses}
        </div>
    );
}
