import React from "react";

interface RippleProps {
    duration?: number;
    color?: string;
    className?: string;
    children: React.ReactNode;
}

export default function MaterialRipple({
    children,
    duration = 600,
    color = "rgba(255, 255, 255, 0.35)",
    className = "",
}: RippleProps) {
    const [ripples, setRipples] = React.useState<
        Array<{ x: number; y: number; size: number; id: number }>
    >([]);
    const nextId = React.useRef(0);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Clean up ripples after animation completes
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples([]);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [ripples, duration]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2;

        const newRipple = { x, y, size, id: nextId.current };
        nextId.current += 1;

        setRipples([...ripples, newRipple]);
    };

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            onMouseDown={handleMouseDown}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: ripple.x - ripple.size / 2,
                        top: ripple.y - ripple.size / 2,
                        width: ripple.size,
                        height: ripple.size,
                        backgroundColor: color,
                        transform: "scale(0)",
                        opacity: "0.7",
                        animation: `ripple ${duration}ms ease-out forwards`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes ripple {
                    to {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `}</style>
            {children}
        </div>
    );
}
