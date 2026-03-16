import { TextAlignJustify } from "lucide-react";
import { SelectHTMLAttributes } from "react";

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    children: React.ReactNode;
}

export function InputSelect({
    className,
    children,
    ...props
}: InputSelectProps) {
    return (
        <div className="relative">
            <select className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30" {...props}>
                {children}
            </select>

            <TextAlignJustify className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 text-muted-foreground" />
        </div>
    );
}