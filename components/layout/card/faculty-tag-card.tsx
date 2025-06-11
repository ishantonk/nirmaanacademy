import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getInitials } from "@/lib/utils";
import { FacultyType, SizeVariant } from "@/lib/types";

export interface FacultyTagCardProps {
    faculty: FacultyType;
    size?: SizeVariant;
    className?: string;
    onClick?: () => void;
}

export default function FacultyTagCard({
    faculty,
    size = "default",
    className,
    onClick,
}: FacultyTagCardProps) {
    const sizing = getSizing(size);

    return (
        <div
            className={cn(
                "flex items-center",
                sizing.card,
                className,
                onClick && "cursor-pointer"
            )}
            onClick={onClick}
        >
            <Avatar className={cn(sizing.avatar, "border")}>
                <AvatarImage
                    src={faculty.image || undefined}
                    alt={faculty.name}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform hover:scale-110"
                />
                <AvatarFallback className={cn(sizing.name)}>
                    {getInitials(faculty.name)}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
                <p
                    className={cn(
                        "font-semibold text-foreground leading-tight",
                        sizing.name
                    )}
                >
                    {faculty.name}
                </p>
                {faculty.designation && (
                    <p
                        className={cn(
                            "text-muted-foreground leading-tight",
                            sizing.designation
                        )}
                    >
                        {faculty.designation}
                    </p>
                )}
            </div>
        </div>
    );
}

export function FacultyTagCardSkeleton({
    size = "default",
}: {
    size?: SizeVariant;
}) {
    const sizing = getSizing(size);

    return (
        <div className={cn("flex items-center", sizing.card)}>
            {/* avatar skeleton */}
            <Skeleton className={cn(sizing.avatar, "rounded-full")} />

            {/* text skeletons */}
            <div className="flex flex-col justify-center space-y-1">
                <Skeleton className={cn("rounded-md", sizing.name)} />
                <Skeleton className={cn("rounded-md", sizing.designation)} />
            </div>
        </div>
    );
}

// Determine sizing based on the size prop
function getSizing(size: SizeVariant) {
    switch (size) {
        case "sm":
            return {
                card: "gap-2",
                avatar: "h-6 w-6",
                name: "text-xs",
                designation: "text-[10px]",
            };
        case "lg":
            return {
                card: "gap-3",
                avatar: "h-10 w-10",
                name: "text-sm font-medium",
                designation: "text-xs",
            };
        default:
            return {
                card: "gap-2.5",
                avatar: "h-8 w-8",
                name: "text-sm",
                designation: "text-xs",
            };
    }
}
