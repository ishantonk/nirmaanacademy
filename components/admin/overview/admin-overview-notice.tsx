import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function AdminOverviewNotice() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notice</CardTitle>
                <CardDescription>
                    Create notice or important announcements.
                </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
        </Card>
    );
}
