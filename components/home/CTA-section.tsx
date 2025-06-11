import { getAuthSession } from "@/lib/auth";
import { fetchVisitors } from "@/lib/services/api";
import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    Star,
    Users,
    Zap,
} from "lucide-react";

export async function CTASection() {
    const session = await getAuthSession();
    const response = await fetchVisitors();

    return (
        <section className="py-16 relative overflow-hidden bg-gradient-to-br from-primary to-accent rounded-t-xl p-8 md:p-12 lg:p-12">
            <div className="container mx-auto px-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Floating Geometric Shapes */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-0"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-400/20 rounded-lg rotate-45 animate-pulse delay-500"></div>
                    <div className="absolute bottom-20 left-32 w-12 h-12 bg-pink-400/20 rounded-full animate-ping delay-1000"></div>
                    <div className="absolute bottom-32 right-16 w-14 h-14 bg-green-400/20 rounded-lg animate-bounce delay-700"></div>

                    {/* Animated Learning Icons */}
                    <div className="absolute top-16 right-1/4 text-white/20 animate-float">
                        <BookOpen size={32} />
                    </div>
                    <div className="absolute bottom-24 left-1/4 text-white/20 animate-float-delay">
                        <GraduationCap size={28} />
                    </div>
                    <div className="absolute top-1/2 left-12 text-white/20 animate-float-slow">
                        <Star size={24} />
                    </div>
                    <div className="absolute top-24 right-12 text-white/20 animate-float-delay">
                        <Zap size={30} />
                    </div>

                    {/* Gradient Orbs */}
                    <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center text-white">
                    {/* Statistics Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                        <Users size={16} />
                        <span className="text-sm font-medium">
                            {response.toLocaleString()}+ Active Learners
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent animate-fade-in leading-20">
                        Ready to Start Learning?
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
                        Join thousands of students and start your learning
                        journey today. Get access to hundreds of courses taught
                        by expert instructors.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <BookOpen size={16} />
                            <span className="text-sm">500+ Courses</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <Star size={16} />
                            <span className="text-sm">Expert Instructors</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <Zap size={16} />
                            <span className="text-sm">Lifetime Access</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group relative bg-background text-primary font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex items-center gap-2 group-hover:text-foreground transition-colors duration-300">
                                <BookOpen size={20} />
                                Browse Courses
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </div>
                        </button>

                        <button className="group relative bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-background hover:text-primary transform hover:scale-105 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex items-center gap-2">
                                <GraduationCap size={20} />
                                Sign Up for Free
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
