"use client"

import { ToastProps } from "./type/Error";

export default function Toast({
  message,
  variant = "error",
  onClose,
}: ToastProps) {
  const styles =
    variant === "error"
      ? "bg-red-600 text-white border-red-700"
      : variant === "success"
      ? "bg-green-600 text-white border-green-700"
      : "bg-gray-900 text-white border-gray-800";

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[320px] max-w-[calc(100vw-2rem)]">
      <div className={`border rounded-lg shadow-lg p-4 ${styles}`}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm leading-5">{message}</p>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-white/90 hover:text-white text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}