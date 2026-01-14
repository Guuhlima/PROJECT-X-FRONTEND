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
        "w-full rounded-md border border-gray-500 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200",
        className
      )}
      {...props}
    />
  )
}