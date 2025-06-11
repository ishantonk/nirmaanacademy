import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/provider/auth-provider";
import { QueryProvider } from "@/components/provider/query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import SiteHeader from "@/components/layout/header/site-header";
import { SiteFooter } from "@/components/layout/footer/site-footer";
import { BottomNavBar } from "@/components/layout/bottom/bottom-navbar";
import SiteInfo from "@/data/contact-info";
import { Whatsapp } from "@/components/layout/whatsapp/whatsapp";
import { Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VisitorTracker } from "@/components/layout/visitor/visitor-tracker";
import { TooltipProvider } from "@/components/ui/tooltip";
import font from "@/lib/font";

export const metadata: Metadata = {
    title: `Home ${SiteInfo.Title}`,
    description: SiteInfo.TagLine,
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
                className={`flex flex-col min-h-screen h-screen ${font.geistSans.variable} ${font.geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <QueryProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <TooltipProvider>
                                <div className="flex flex-col overflow-hidden">
                                    <ScrollArea className="flex-1 h-full">
                                        <div className="flex flex-col w-screen">
                                            <SiteHeader />
                                            <main className="flex-1">
                                                {children}
                                            </main>
                                            <SiteFooter />
                                        </div>
                                    </ScrollArea>
                                </div>
                            </TooltipProvider>
                            <Whatsapp />
                            <BottomNavBar />
                            <Toaster />
                            <VisitorTracker />
                        </ThemeProvider>
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
