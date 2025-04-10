import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NoticeCard() {
    return (
        <Card className="w-full min-h-80 max-w-md bg-accent/85">
            <CardHeader>
                <CardTitle className="text-lg font-bold">
                    Important Notice
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-4">
                    <li className="text-muted-foreground text-sm">
                        Get Latest Studio Recorded Classes For CMA, CFM & CA
                        June/Dec 25 Attempt
                    </li>
                    <li className="text-muted-foreground text-sm">
                        COC Education has Launched CFM Course
                    </li>
                </ol>
            </CardContent>
        </Card>
    );
}
