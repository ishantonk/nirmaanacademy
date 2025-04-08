import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function CourseCategoriesCard() {
    return (
        <Card className="mb-6 w-full max-w-md bg-accent/85">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Courses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">View All Courses</Link>
                        </Button>
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">CA</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">CMA</Link>
                        </Button>
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">CS</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">B.Com</Link>
                        </Button>
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">Class 11th</Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">CMA</Link>
                        </Button>
                        <Button asChild className="w-full rounded-full p-6">
                            <Link href="/courses">Class 12th</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
