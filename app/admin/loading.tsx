import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="faculties">Faculties</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
                <div className="space-y-4 mt-4">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </TabsContent>

            <TabsContent value="categories">
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-20 rounded-xl" />
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="faculties">
                <div className="space-y-3 mt-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="courses">
                <div className="space-y-4 mt-4">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
