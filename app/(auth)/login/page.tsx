import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { brandName } from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Login | " + brandName,
    description: `Login to your ${brandName} account`,
};

export default function LoginPage() {
    return <LoginForm />;
}
