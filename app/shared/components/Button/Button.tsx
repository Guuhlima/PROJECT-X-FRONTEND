import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
  iconOnly?: boolean;
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  danger: "bg-destructive text-white hover:bg-destructive/90",
};

export default function Button({
  children,
  variant = "primary",
  className,
  icon,
  iconOnly = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer",
        iconOnly ? "h-9 w-9 p-0" : "px-4 py-2",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon}
      {!iconOnly && children}
    </button>
  );
}
