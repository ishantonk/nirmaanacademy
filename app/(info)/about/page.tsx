import { Metadata } from "next";
import { CheckCircle2, Target, Lightbulb, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutUsData } from "@/data/about-us";

export const metadata: Metadata = {
    title: aboutUsData.title,
    description: aboutUsData.description,
};

export default function AboutPage() {
    return (
        <div className="container mx-auto py-10 space-y-16 px-4">
            {/* Hero Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    {aboutUsData.title}
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    {aboutUsData.tagline}
                </p>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg text-muted-foreground">
                    {aboutUsData.description}
                </p>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            Engaging
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {aboutUsData.values.engaging}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Innovative
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {aboutUsData.values.innovative}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Practical
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {aboutUsData.values.practical}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center">
                    Why Choose Us
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {aboutUsData.why_choose_us.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                            <p className="text-muted-foreground">{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {aboutUsData.vision_mission.vision}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {aboutUsData.vision_mission.mission}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Founder */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center">Our Founder</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>{aboutUsData.founder.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">
                                Qualifications
                            </h3>
                            <ul className="list-disc list-inside text-muted-foreground">
                                {aboutUsData.founder.qualifications.map(
                                    (qual, index) => (
                                        <li key={index}>{qual}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Experience</h3>
                            <p className="text-muted-foreground">
                                {aboutUsData.founder.experience}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Achievements</h3>
                            <ul className="list-disc list-inside text-muted-foreground">
                                {aboutUsData.founder.achievements.map(
                                    (achievement, index) => (
                                        <li key={index}>{achievement}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Contact */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <div className="text-muted-foreground space-y-2">
                    <p>{aboutUsData.contact.address}</p>
                    <p>{aboutUsData.contact.email}</p>
                    <p>{aboutUsData.contact.phone}</p>
                </div>
            </div>
        </div>
    );
}
