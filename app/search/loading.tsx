import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container py-8 mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Search Courses</h1>
            {/* Search form */}
            <form className="flex gap-2">
                <div className="relative flex-1">
                    {/* Skeleton for the search icon placeholder */}
                    <Skeleton className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded" />
                    {/* Skeleton for the input field */}
                    <Skeleton className="pl-10 block w-full h-10 rounded border border-gray-200" />
                </div>
                {/* Skeleton for the search button */}
                <Skeleton className="w-20 h-10 rounded border border-gray-200" />
            </form>

            {/* Categories */}
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-auto py-4 w-full rounded border border-gray-200" // customize styles as needed
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
