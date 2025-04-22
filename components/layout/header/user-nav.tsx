"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    CreditCard,
    LayoutDashboard,
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

export function UserNav() {
    const { data: session } = useSession();
    const router = useRouter();
    const isMobile = useIsMobile();

    if (!session) {
        return (
            <>
                {isMobile ? (
                    /* Mobile user nav */
                    <div className="flex md:hidden items-center gap-2">
                        <Button size={"icon"} variant="ghost" asChild>
                            <Link href={"/login"}>
                                <User className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    /* Desktop user nav */
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" asChild>
                            <Link href={"/login"}>Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href={"/register"}>Sign Up</Link>
                        </Button>
                    </div>
                )}
            </>
        );
    }

    const { user } = session;

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
    };

    return isMobile ? (
        <UserNavMobile
            user={user}
            getInitials={getInitials}
            handleSignOut={handleSignOut}
        />
    ) : (
        <UserNavDesktop
            user={user}
            getInitials={getInitials}
            handleSignOut={handleSignOut}
        />
    );
}

interface UserNavProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
    };
    getInitials: (name: string) => string;
    handleSignOut: () => void;
}

export function UserNavMobile({
    user,
    getInitials,
    handleSignOut,
}: UserNavProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full group"
                >
                    <Avatar className="h-8 w-8 transition-opacity duration-200 group-hover:opacity-60">
                        <AvatarImage
                            src={user.image || ""}
                            alt={user.name || ""}
                        />
                        <AvatarFallback>
                            {user.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex items-center space-x-2">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={user.image || ""}
                                alt={user.name || ""}
                            />
                            <AvatarFallback>
                                {user.name ? getInitials(user.name) : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-shrink-0">
                            <DrawerTitle className="">{user.name}</DrawerTitle>
                            <DrawerDescription className="">
                                {user.email}
                            </DrawerDescription>
                        </div>
                    </div>
                </DrawerHeader>
                <Separator />
                <div className="flex flex-col gap-2 px-4 py-2">
                    <DrawerClose asChild className="px-4">
                        <Button
                            variant={"ghost"}
                            size={"lg"}
                            className="w-full"
                            asChild
                        >
                            <Link href={"/profile"}>
                                <div className="flex items-start w-full">
                                    <User className="mr-8 h-8 w-8" />
                                    <span>Profile</span>
                                </div>
                            </Link>
                        </Button>
                    </DrawerClose>
                    <DrawerClose asChild className="px-4">
                        <Button
                            variant={"ghost"}
                            size={"lg"}
                            className="w-full"
                            asChild
                        >
                            <Link href={"/dashboard"}>
                                <div className="flex items-start w-full">
                                    <LayoutDashboard className="mr-8 h-8 w-8" />
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                        </Button>
                    </DrawerClose>
                    {user.role === "ADMIN" && (
                        <DrawerClose asChild className="px-4">
                            <Button
                                variant={"ghost"}
                                size={"lg"}
                                className="w-full"
                                asChild
                            >
                                <Link href={"/admin"}>
                                    <div className="flex items-start w-full">
                                        <Settings className="mr-8 h-8 w-8" />
                                        <span>Admin Dashboard</span>
                                    </div>
                                </Link>
                            </Button>
                        </DrawerClose>
                    )}
                    <DrawerClose asChild className="px-4">
                        <Button
                            variant={"ghost"}
                            size={"lg"}
                            className="w-full"
                            asChild
                        >
                            <Link href={"/checkout"}>
                                <div className="flex items-start w-full">
                                    <CreditCard className="mr-8 h-8 w-8" />
                                    <span>Checkout</span>
                                </div>
                            </Link>
                        </Button>
                    </DrawerClose>
                    <DrawerClose asChild className="px-4">
                        <Button
                            variant={"ghost"}
                            size={"lg"}
                            className="w-full"
                            asChild
                        >
                            <Link href={"/contact"}>
                                <div className="flex items-start w-full">
                                    <LifeBuoy className="mr-8 h-8 w-8" />
                                    <span>Support</span>
                                </div>
                            </Link>
                        </Button>
                    </DrawerClose>
                </div>
                <Separator />
                <DrawerFooter>
                    <DrawerClose asChild className="px-4">
                        <Button onClick={handleSignOut} variant="outline">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export function UserNavDesktop({
    user,
    getInitials,
    handleSignOut,
}: UserNavProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full group"
                >
                    <Avatar className="h-8 w-8 transition-opacity duration-200 group-hover:opacity-60">
                        <AvatarImage
                            src={user.image || ""}
                            alt={user.name || ""}
                        />
                        <AvatarFallback>
                            {user.name ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={"/profile"}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/dashboard"}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    {user.role === "ADMIN" && (
                        <DropdownMenuItem asChild>
                            <Link href={"/admin"}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Admin Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href={"/checkout"}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Checkout</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={"/contact"}>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
