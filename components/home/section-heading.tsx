import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type buttonLinkType = {
    link: string;
    label: string;
};

export default function SectionHeading({
    title,
    description,
    buttonLink,
}: {
    title: string;
    description?: string;
    buttonLink?: buttonLinkType;
}) {
    return (
        <div className="relative">
            {/* Content */}
            <div className="flex items-center justify-between">
                <div className="relative  inline-flex flex-col overflow-hidden rounded-lg p-2 mb-6">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-blue-500 to-indigo-600 opacity-40 animate-pulse"></div>

                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/10 border border-white/20"></div>
                    <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm lg:text-base mt-2 text-white/90 font-medium drop-shadow-md max-w-2xl">
                            {description}
                        </p>
                    )}
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"></div>
                </div>
                {buttonLink && (
                    <div className="ml-4">
                        <Button
                            className="
                                relative overflow-hidden group
                                bg-gradient-to-r from-emerald-500 to-teal-600 
                                hover:from-emerald-400 hover:to-teal-500
                                text-white font-semibold
                                px-6 py-3 rounded-full
                                shadow-xl hover:shadow-2xl
                                border-2 border-white/30
                                transition-all duration-300 ease-out
                                hover:scale-105 active:scale-95
                                backdrop-blur-sm
                            "
                            asChild
                        >
                            <Link
                                href={buttonLink.link}
                                className="flex items-center"
                            >
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

                                <span className="relative z-10">
                                    {buttonLink.label}
                                </span>
                                <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
