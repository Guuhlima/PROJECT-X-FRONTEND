"use client";

import { useEffect, useState } from "react";
import { ToastProps } from "./type/Error";

export default function Toast({
  message,
  variant = "error",
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);
  const durationMs = 10000;

  useEffect(() => {
    const progressAnimation = window.setTimeout(() => {
      setProgress(0);
    }, 20);

    if (!onClose) {
      return () => window.clearTimeout(progressAnimation);
    }

    const closeTimer = window.setTimeout(() => {
      onClose();
    }, durationMs);

    return () => {
      window.clearTimeout(progressAnimation);
      window.clearTimeout(closeTimer);
    };
  }, [onClose]);

  const styles =
    variant === "error"
      ? "border-red-700 bg-red-600 text-white"
      : variant === "success"
        ? "border-green-700 bg-green-600 text-white"
        : "border-gray-800 bg-gray-900 text-white";

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[320px] max-w-[calc(100vw-2rem)]">
      <div className={`overflow-hidden rounded-lg border p-4 shadow-lg ${styles}`}>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm leading-5">{message}</p>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-lg leading-none text-white/90 hover:text-white"
              aria-label="Close"
            >
              x
            </button>
          )}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white/80 transition-[width] ease-linear"
            style={{
              width: `${progress}%`,
              transitionDuration: `${durationMs}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
