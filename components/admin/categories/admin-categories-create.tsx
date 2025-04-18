import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminCategoriesForm } from "./admin-categories-form";

export function AdminCategoriesCreate() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new category</CardTitle>
                <CardDescription>
                    Add new category for courses and blogs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AdminCategoriesForm />
            </CardContent>
        </Card>
    );
}
