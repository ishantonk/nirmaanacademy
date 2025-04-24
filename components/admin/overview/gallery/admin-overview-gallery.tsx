import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AdminGalleryCarousel } from "./admin-overview-gallery-carousel";
import { AdminGallerySlideAdd } from "./admin-overview-gallery-slide-add";

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
                    <AdminGallerySlideAdd />
                </div>

                <AdminGalleryCarousel />
            </CardContent>
        </Card>
    );
}
