import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuthSession } from "@/lib/auth";
import { brandName } from "@/data/contact-info";
import { ProfileForm } from "@/components/profile/profile-form";
import { ProfilePasswordForm } from "@/components/profile/profile-password-form";

export const metadata: Metadata = {
    title: "Profile | " + brandName,
    description: "Manage your profile",
};

export default async function ProfilePage() {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Profile Settings
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    Update your personal information and manage account security
                    settings including password changes on your Nirmaan Academy
                    profile.
                </p>
            </div>

            {/* Tabs for user profile and password update */}
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-6">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="password" className="mt-6">
                    <ProfilePasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
