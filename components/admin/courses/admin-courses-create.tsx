import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCoursesForm } from "@/components/admin/courses/admin-courses-form";
import { fetchCategories, fetchFaculties } from "@/lib/fetch";
import { prisma } from "@/lib/prisma";

export async function AdminCoursesCreate() {
    const categories = await fetchCategories();
    const faculties = await fetchFaculties();
    const modes = await prisma.mode.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    const attempts = await prisma.attempt.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new course</CardTitle>
                <CardDescription>
                    Add new course for Nirmaan Academy.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminCoursesForm
                    categories={categories}
                    faculties={faculties}
                    modes={modes}
                    attempts={attempts}
                />
            </CardContent>
        </Card>
    );
}
