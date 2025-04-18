import { useRef } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IconImagePickerProps {
    className?: string;
    onImageSelect: (file: File) => void;
}

export function IconImagePicker({
    onImageSelect,
    className,
}: IconImagePickerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div className={className}>
            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Icon button */}
            <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                onClick={handleButtonClick}
            >
                <Pencil className="w-5 h-5" />
            </Button>
        </div>
    );
}
