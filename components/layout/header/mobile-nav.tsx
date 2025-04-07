"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

interface MobileNavProps {
    items: {
        title: string;
        href: string;
        icon?: React.ElementType;
        description?: string;
    }[];
}

export function MobileNav({ items }: MobileNavProps) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <MobileNavHeader status={status} session={session} />
                <ScrollArea className="h-[calc(100vh-4rem)] pb-10 px-4">
                    <div className="flex flex-col space-y-3">
                        {items.map((item) => (
                            <SheetClose asChild key={item.title}>
                                <Button
                                    className={cn(
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground",
                                        "w-full justify-start [&_svg:not([class*='size-'])]:size-6 has-[>svg]:px-2"
                                    )}
                                    size={"lg"}
                                    variant="ghost"
                                    asChild
                                    onClick={() => {
                                        router.push(item.href);
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                                        {item.icon && (
                                            <item.icon
                                                className={cn(
                                                    pathname === item.href
                                                        ? "text-primary"
                                                        : "text-muted-foreground",
                                                    "mr-2 group-hover:text-primary"
                                                )}
                                            />
                                        )}
                                        {item.title}
                                    </div>
                                </Button>
                            </SheetClose>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export function MobileNavHeader({
    status,
    session,
}: {
    status: string;
    session: Session | null;
}) {
    return (
        <SheetHeader>
            {status === "loading" && (
                <div className="animate-pulse flex items-center space-x-2">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                    <div className="flex flex-col space-y-1">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
            )}
            {status === "authenticated" &&
                (session ? (
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={session.user.image || ""}
                                alt={session.user.name || ""}
                            />
                            <AvatarFallback>
                                {session.user.name
                                    ? getInitials(session.user.name)
                                    : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-shrink-0">
                            <SheetTitle>{session.user.name}</SheetTitle>
                            <SheetDescription className="text-sm text-muted-foreground">
                                {session.user.email}
                            </SheetDescription>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-shrink-0">
                            <SheetTitle>Guest</SheetTitle>
                            <SheetDescription className="text-sm text-muted-foreground">
                                Sign in to access your account
                            </SheetDescription>
                        </div>
                    </div>
                ))}
            {status === "unauthenticated" && (
                <div className="flex items-center space-x-2">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-shrink-0">
                        <SheetTitle>Guest</SheetTitle>
                        <SheetDescription className="text-sm text-muted-foreground">
                            Sign in to access your account
                        </SheetDescription>
                    </div>
                </div>
            )}
        </SheetHeader>
    );
}
