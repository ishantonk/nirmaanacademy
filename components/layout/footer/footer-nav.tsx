import Link from "next/link";

interface FooterNavProps {
    heading?: string;
    links: Array<{ href: string; label: string }>;
}

export function FooterNav({ heading, links }: FooterNavProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">{heading}</h3>
            <ul className="space-y-2 text-sm">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
