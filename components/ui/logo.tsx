import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, size }: { className?: string, size?: "sm" | "md" | "lg" }) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center space-x-2 font-semibold text-xl text-primary relative",
                className
            )}
            aria-label="Go to homepage"
        >
            <div className={cn(size === "sm" ? "w-14 h-14" : size === "md" ? "w-24 h-24" : "w-32 h-32" , "relative transition-all duration-300")}>
                <Image
                    src={"/logo.png"}
                    alt="nirmaan-academy"
                    fill
                    className="object-contain absolute inset-0"
                />
            </div>
            <span className={cn(size === "sm" ? "hidden sm:inline-block text-sm font-semibold" : size === "md" ? "hidden sm:inline-block text-normal font-semibold" : "hidden sm:inline-block text-lg font-semibold")}>Nirmaan academy</span>
        </Link>
    )
}