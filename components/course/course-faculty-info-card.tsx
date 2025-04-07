import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FacultyType } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export function CourseFacultyInfoCard({
    faculty,
    size = "md",
}: {
    faculty: FacultyType | null;
    size?: "sm" | "md" | "lg";
}) {
    if (!faculty) {
        return <div className="text-muted-foreground">No Faculty</div>;
    }
    // Set the size of the avatar based on the size prop
    const avatarSize =
        size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-10 w-10";
    // Set the name font size based on the size prop
    const nameFontSize =
        size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
    // Set the designation font size based on the size prop
    const designationFontSize =
        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

    return (
        <div className="flex items-center gap-2">
            <Avatar className={avatarSize}>
                <AvatarImage src={faculty.image || undefined} />
                <AvatarFallback>
                    {faculty.name ? getInitials(faculty.name) : "NA"}
                </AvatarFallback>
            </Avatar>

            <div>
                <h3 className={"font-medium" + " " + nameFontSize}>
                    {faculty.name || "NA"}
                </h3>
                <p
                    className={
                        "text-muted-foreground" + " " + designationFontSize
                    }
                >
                    {faculty.designation || "NA"}
                </p>
            </div>
        </div>
    );
}
