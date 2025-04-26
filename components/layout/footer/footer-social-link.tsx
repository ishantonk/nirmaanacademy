import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NirmaanSocialLink } from "@/data/links-name";

export function FooterSocialLink() {
    return (
        <div className="flex items-center gap-x-4">
            <Link href={NirmaanSocialLink.linkedin}>
                <Button
                    variant={"outline"}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-blue-600 transition-colors duration-300 group"
                >
                    <Linkedin
                        size={6}
                        className="text-blue-600 group-hover:text-white"
                    />
                </Button>
            </Link>
            <Link href={NirmaanSocialLink.youtube}>
                <Button
                    variant={"outline"}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-red-600 transition-colors duration-300 group"
                >
                    <Youtube
                        size={6}
                        className="text-red-600 group-hover:text-white"
                    />
                </Button>
            </Link>
            <Link href={NirmaanSocialLink.facebook}>
                <Button
                    variant={"outline"}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-blue-800 transition-colors duration-300 group"
                >
                    <Facebook
                        size={6}
                        className="text-blue-800 group-hover:text-white"
                    />
                </Button>
            </Link>
            <Link href={NirmaanSocialLink.instagram}>
                <Button
                    variant={"outline"}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-pink-500 transition-colors duration-300 group"
                >
                    <Instagram
                        size={6}
                        className="text-pink-500 group-hover:text-white"
                    />
                </Button>
            </Link>
        </div>
    );
}
