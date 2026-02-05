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
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30",
        className
      )}
      {...props}
    />
  )
}
