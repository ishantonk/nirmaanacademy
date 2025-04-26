"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {pathname === "/login"
                            ? "Welcome back"
                            : "Create an account"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {pathname === "/login"
                            ? "Enter your email to sign in to your account"
                            : "Enter your details below to create your account"}
                    </p>
                </div>
                {children}
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href={
                            pathname === "/login"
                                ? "/register"
                                : "/login"
                        }
                        className="hover:text-brand underline underline-offset-4"
                    >
                        {pathname === "/login"
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    );
}
