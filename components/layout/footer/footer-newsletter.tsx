import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterNewsletter() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    Subscribe to our newsletter for updates and exclusive
                    content.
                </p>
                <form className="flex space-x-2">
                    <Input type="email" placeholder="Enter your email" />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
        </div>
    );
}
