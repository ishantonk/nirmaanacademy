import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/provider/auth-provider";
import { QueryProvider } from "@/components/provider/query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { SiteHeader } from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { BottomNavBar } from "@/components/layout/bottom/bottom-navbar";
import { brandName } from "@/data/contact-info";
import { aboutUsData } from "@/data/about-us";
import { Whatsapp } from "@/components/layout/whatsapp/whatsapp";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Home | " + brandName,
    description: aboutUsData.tagline,
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <SiteHeader />
                            <main className="flex-1">{children}</main>
                            <SiteFooter />
                            <Whatsapp />
                            <BottomNavBar />
                            <Toaster />
                        </ThemeProvider>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
