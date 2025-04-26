import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NirmaanSocialLink } from "@/data/links-name";

export function Whatsapp() {
    return (
        <div className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-50 aspect-square overflow-hidden rounded-full">
            <Button
                asChild
                size={"icon"}
                className="h-12 lg:h-14 w-full bg-green-400 hover:bg-green-500 p-2 hover:scale-105 active:scale-95 active:shadow-sm transition-all"
            >
                <Link href={NirmaanSocialLink.whatsapp}>
                    <div className="relative h-full w-full aspect-square">
                        <Image
                            src="/whatsapp.svg"
                            alt="WhatsApp"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
            </Button>
        </div>
    );
}
