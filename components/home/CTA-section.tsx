import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

export async function CTASection() {
    const session = await getAuthSession();

    return (
        <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-xl mb-8 text-primary-foreground/80">
                        Join thousands of students and start your learning
                        journey today. Get access to hundreds of courses taught
                        by expert instructors.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                        {session && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                                asChild
                            >
                                <Link href="/register">Sign Up for Free</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
