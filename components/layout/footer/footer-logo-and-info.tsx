import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/contact-info";

export function FooterLogoAndInfo() {
    return (
        <div className="space-y-4">
            <div className="w-38 h-28">
                <Image
                    src="/logo.png"
                    alt="Nirmaan academy Logo"
                    width={200}
                    height={200}
                    className="object-cover"
                />
            </div>
            <div className="space-y-2 text-sm font-medium text-muted-foreground">
                <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span>{contactInfo.email}</span>
                </div>
            </div>
        </div>
    );
}
