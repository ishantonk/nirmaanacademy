"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Filter } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function CourseFiltersSkeleton() {
    const isMobile = useIsMobile();

    const renderFilterBlock = (title: string, count: number = 3) => (
        <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
            ))}
        </div>
    );

    return !isMobile ? (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-24" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-40" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {renderFilterBlock("Categories")}
                <Separator />
                {renderFilterBlock("Price", 3)}
                <Separator />
                {renderFilterBlock("Sort By", 4)}
                <Button variant="outline" className="w-full" disabled>
                    <Skeleton className="h-4 w-20" />
                </Button>
            </CardContent>
        </Card>
    ) : (
        <div className="flex items-center justify-end">
            <Sheet>
                <Button variant="outline" disabled>
                    <Filter className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                </Button>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <Skeleton className="h-5 w-24" />
                        </SheetTitle>
                        <SheetDescription>
                            <Skeleton className="h-4 w-40" />
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full overflow-y-auto px-4 py-4 space-y-6">
                            {renderFilterBlock("Categories")}
                            <Separator />
                            {renderFilterBlock("Price", 3)}
                            <Separator />
                            {renderFilterBlock("Sort By", 4)}
                        </ScrollArea>
                    </div>
                    <SheetFooter className="border-t pt-4">
                        <Button variant="outline" className="w-full" disabled>
                            <Skeleton className="h-4 w-20" />
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
