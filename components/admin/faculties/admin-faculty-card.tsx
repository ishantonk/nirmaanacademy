import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminFacultyEdit } from "@/components/admin/faculties/admin-faculty-edit";
import { FacultyType } from "@/lib/types";
import { capitalize, getInitials, humanize } from "@/lib/utils";

export function AdminFacultyCard({ faculty }: { faculty: FacultyType }) {
    return (
        <div className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3">
            {/* Faculty Info Placeholder */}
            <div className="flex flex-row gap-4 w-full">
                {/* Avatar */}
                <Avatar className="w-16 h-16">
                    <AvatarImage src={faculty.image || undefined} />
                    <AvatarFallback>
                        {faculty.name ? getInitials(faculty.name) : "NA"}
                    </AvatarFallback>
                </Avatar>

                {/* Text Info */}
                <div className="flex flex-col justify-center flex-1">
                    <div className="flex flex-row justify-start items-center gap-x-2">
                        {/* Name */}
                        <h3 className="text-lg font-semibold text-pretty text-foreground">
                            {humanize(faculty.name)}
                        </h3>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        {/* Number of courses */}
                        <span className="text-xs text-primary">
                            Courses {faculty._count?.courses}
                        </span>
                    </div>
                    {/* Designation */}
                    <span className="text-sm text-muted-foreground">
                        {capitalize(faculty.designation!)}
                    </span>
                    {/* Email */}
                    <span className="text-sm text-muted-foreground text-pretty">
                        {faculty.email}
                    </span>
                </div>
            </div>

            {/* Edit Button */}
            <div className="flex flex-1 items-center justify-end">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <AdminFacultyEdit faculty={faculty} />
                </div>
            </div>
        </div>
    );
}

export function AdminFacultyCardSkeleton() {
    return (
        <div className="flex flex-row bg-muted/50 border border-muted rounded-lg p-3">
            {/* Faculty Info Placeholder */}
            <div className="flex flex-row gap-4 w-full">
                {/* Avatar */}
                <Skeleton className="w-16 h-16 rounded-full" />

                {/* Text Info */}
                <div className="flex flex-col justify-center flex-1 space-y-2">
                    {/* Name + dot + courses */}
                    <div className="flex flex-row items-center gap-x-2">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                    </div>

                    {/* Designation */}
                    <Skeleton className="h-4 w-40 rounded-md" />

                    {/* Email */}
                    <Skeleton className="h-4 w-48 rounded-md" />
                </div>
            </div>

            {/* Edit Button */}
            <div className="flex flex-1 items-center justify-end">
                <Skeleton className="h-8 w-8 rounded-md" />
            </div>
        </div>
    );
}
