import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import SiteInfo from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Register | " + SiteInfo.Title,
    description: `Create an ${SiteInfo.Title} account`,
};

export default function RegisterPage() {
    return <RegisterForm />;
}
