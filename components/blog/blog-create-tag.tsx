import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function BlogCreateTag() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" aria-label="Add new tag">
                    <Plus className="w-4 h-4" />
                    Add Slide
                </Button>
            </DialogTrigger>
        </Dialog>
    );
}
