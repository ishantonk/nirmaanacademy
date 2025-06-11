import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import SiteInfo from "@/data/contact-info";

export const metadata: Metadata = {
    title: "Login | " + SiteInfo.Title,
    description: `Login to your ${SiteInfo.Title} account`,
};

export default function LoginPage() {
    return <LoginForm />;
}
