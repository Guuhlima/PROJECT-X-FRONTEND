import { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({
  className,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={clsx(
        "w-full rounded-xl border border-input bg-background/80 px-3 py-2.5 text-sm text-foreground shadow-xs outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}
