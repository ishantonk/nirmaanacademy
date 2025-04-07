import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import { brandName } from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Register | " + brandName,
    description: `Create an ${brandName} account`,
};

export default function RegisterPage() {
    return <RegisterForm />;
}
