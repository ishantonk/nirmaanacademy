import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function NoticeCard() {
    return (
        <Card className="mb-6 w-full max-w-md bg-accent/85">
            <CardHeader>
                <CardTitle className="text-lg font-bold">
                    Important Notice
                </CardTitle>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-4 mt-4">
                        <li className="text-muted-foreground">
                            Get Latest Studio Recorded Classes For CMA, CFM & CA
                            June/Dec 25 Attempt
                        </li>
                        <li className="text-muted-foreground">
                            COC Education has Launched CFM Course
                        </li>
                    </ol>
                </CardContent>
            </CardHeader>
        </Card>
    );
}
