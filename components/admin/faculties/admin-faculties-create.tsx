import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminFacultiesForm } from "@/components/admin/faculties/admin-faculties-form";

export function AdminFacultiesCreate() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new faculty</CardTitle>
                <CardDescription>
                    Add new faculty or instructors for courses.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminFacultiesForm />
            </CardContent>
        </Card>
    );
}
