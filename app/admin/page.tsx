import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCategories } from "@/components/admin/categories/admin-categories";
import { AdminFaculties } from "@/components/admin/faculties/admin-faculties";
import { AdminOverview } from "@/components/admin/overview/admin-overview";
import { AdminCourses } from "@/components/admin/courses/admin-courses";

export default function AdminPage() {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="faculties">Faculties</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <AdminOverview />
            </TabsContent>
            <TabsContent value="categories">
                <AdminCategories />
            </TabsContent>
            <TabsContent value="faculties">
                <AdminFaculties />
            </TabsContent>
            <TabsContent value="courses">
                <AdminCourses />
            </TabsContent>
        </Tabs>
    );
}
