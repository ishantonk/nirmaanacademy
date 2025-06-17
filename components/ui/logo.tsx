import Link from "next/link";
import ResponsiveImage from "@/components/ui/responsive-image";
import SiteInfo from "@/data/contact-info";
import { SizeVariant } from "@/lib/types";

interface LogoProps {
    size?: SizeVariant;
    label?: boolean;
    className?: string;
}

export default function Logo({
    size = "default",
    label = true,
    className,
}: LogoProps) {
    const sizing = getSizing(size);

    return (
        <Link
            href="/"
            aria-label="Go to homepage"
            className={`flex flex-row items-center gap-2 w-fit ${className}`}
        >
            {/* Logo Image */}
            <div
                className={`flex flex-col justify-center items-start transition-[width] ${sizing.image} `}
            >
                <ResponsiveImage
                    ratio={5 / 4}
                    className="p-2 !object-contain"
                    src="/logo.png"
                    alt={SiteInfo.Slug}
                />
            </div>

            {/* Logo Title */}
            <h1
                className={`font-semibold text-primary ${sizing.text} ${
                    !label && "sr-only"
                }`}
            >
                {SiteInfo.Title}
            </h1>
        </Link>
    );
}

/**
 * Utility function to get image and text size classes based on size variant.
 */
function getSizing(size: SizeVariant = "default") {
    switch (size) {
        case "sm":
            return {
                image: "w-16",
                text: "text-sm",
            };
        case "lg":
            return {
                image: "w-24",
                text: "text-base",
            };
        case "xl":
            return {
                image: "w-32",
                text: "text-lg",
            };
        default:
            return {
                image: "w-20",
                text: "text-base",
            };
    }
}
