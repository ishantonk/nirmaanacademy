import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Whatsapp() {
    return (
        <Button className="fixed bottom-16 lg:bottom-8 right-5 z-50 h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-green-400 hover:bg-green-300 p-2 shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 active:shadow-sm transition-all duration-200 ease-in-out">
            <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                width={50}
                height={50}
            />
        </Button>
    );
}
