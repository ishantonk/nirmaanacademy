import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-[-1]">
                <Image
                    src="/bg-hero.jpg" // Update this path with your background image
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    style={{
                        objectPosition: "center",
                        backgroundAttachment: "fixed",
                    }}
                />
            </div>
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <Card className="mb-6 w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">
                            Important Notice
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm text-gray-600">
                            Our website will be undergoing scheduled maintenance
                            on Saturday.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </section>
    );
}
