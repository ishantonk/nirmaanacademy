import { AdminOverviewAnalytics } from "@/components/admin/overview/admin-overview-analytics";
import { AdminOverviewCard } from "@/components/admin/overview/admin-overview-card";
import { AdminOverviewNotice } from "./notice/admin-overview-notice";
import { AdminOverviewGallery } from "./gallery/admin-overview-gallery";

export function AdminOverview() {
    return (
        <div className="flex flex-col space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AdminOverviewCard />
                <AdminOverviewCard />
                <AdminOverviewCard />
                <AdminOverviewCard />
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <AdminOverviewAnalytics />
                </div>
                <div className="lg:col-span-5 sticky top-24">
                    <div className="grid gap-4 lg:grid-rows-2 h-fit">
                        <div className="row-span-1">
                            <AdminOverviewNotice />
                        </div>
                        <div className="row-span-1">
                            <AdminOverviewGallery />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
