interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({
    children,
    className = "",
}: ContainerProps) {
    return (
        <div className={`mx-auto max-w-7xl px-2 sm:px-3 lg:px-4 ${className}`}>
            {children}
        </div>
    );
}
