import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminGalleryAdd } from "./admin-gallery-add";
import { AdminGalleryCarousel } from "./admin-gallery-carousel";

export function AdminOverviewGallery() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>
                    Add or remove photos and videos for home carousel.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add button */}
                <div className="flex justify-end">
                    <AdminGalleryAdd />
                </div>

                <AdminGalleryCarousel />
            </CardContent>
        </Card>
    );
}
