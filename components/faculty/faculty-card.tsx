import { Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacultyType } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export function FacultyCard({ faculty }: { faculty: FacultyType }) {
    return (
        <div className="flex flex-col gap-y-6 overflow-hidden transition-all group">
            <div className="flex flex-col space-y-2 text-center">
                <Avatar className="w-28 h-28 md:w-32 md:h-32 mx-auto mb-4">
                    <AvatarImage
                        className="group-hover:scale-110 transition-all duration-200"
                        src={faculty.image || ""}
                        alt={faculty.name || ""}
                    />
                    <AvatarFallback className="text-2xl">
                        {faculty.name ? getInitials(faculty.name) : "NA"}
                    </AvatarFallback>
                </Avatar>
                <h2 className="text-lg lg:text-xl font-semibold">{faculty.name}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {faculty.email}
                </div>
            </div>
            <div className="flex flex-col space-y-2 text-center">
                <p className="line-clamp-2 text-muted-foreground">
                    {faculty.bio}
                </p>
                <div className="flex flex-row gap-2 justify-center items-center mx-auto">
                    <div className="text-sm text-muted-foreground line-clamp-1">
                        {faculty.designation}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                        {faculty._count?.courses}{" "}
                        {faculty._count?.courses === 1 ? "Course" : "Courses"}
                    </div>
                </div>
            </div>
        </div>
    );
}
