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
            <div className="lg:text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    {aboutUsData.title}
                </h1>
                <p className="text-sm lg:text-base mt-2 text-muted-foreground">
                    {aboutUsData.tagline}
                </p>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto lg:text-center">
                <p className="text-lg text-muted-foreground">
                    {aboutUsData.description}
                </p>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-yellow-100 border-2 border-yellow-300 hover:bg-yellow-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-600">
                            <Lightbulb className="w-5 h-5" />
                            Engaging
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-yellow-700">
                            {aboutUsData.values.engaging}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-green-100 border-2 border-green-300 hover:bg-green-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                            <GraduationCap className="w-5 h-5" />
                            Innovative
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700">
                            {aboutUsData.values.innovative}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-100 border-2 border-blue-300 hover:bg-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                            <Target className="w-5 h-5" />
                            Practical
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-700">
                            {aboutUsData.values.practical}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-600">
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
                <Card className="bg-purple-100 border-2 border-purple-300 hover:bg-purple-200">
                    <CardHeader>
                        <CardTitle className="text-purple-600">
                            Our Vision
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-purple-700">
                            {aboutUsData.vision_mission.vision}
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-teal-100 border-2 border-teal-300 hover:bg-teal-200">
                    <CardHeader>
                        <CardTitle className="text-teal-600">
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-teal-700">
                            {aboutUsData.vision_mission.mission}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Founder */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-pink-600">
                    Our Founder
                </h2>
                <Card className="bg-fuchsia-100 border-2 border-fuchsia-300 hover:bg-fuchsia-200">
                    <CardHeader>
                        <CardTitle className="text-fuchsia-600">
                            {aboutUsData.founder.name}
                        </CardTitle>
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
                <h2 className="text-3xl font-bold text-red-600">
                    Get in Touch
                </h2>
                <div className="text-muted-foreground space-y-2">
                    <p>{aboutUsData.contact.address}</p>
                    <p>{aboutUsData.contact.email}</p>
                    <p>{aboutUsData.contact.phone}</p>
                </div>
            </div>
        </div>
    );
}
