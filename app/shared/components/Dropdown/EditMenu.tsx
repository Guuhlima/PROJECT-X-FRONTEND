"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type DropdownEditMenuProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  align?: "left" | "right";
};

export default function EditMenu({
  children,
  align = "right",
  ...rest
}: DropdownEditMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (!dropdownRef.current || !triggerRef.current) return;
      if (
        !dropdownOpen ||
        dropdownRef.current.contains(target) ||
        triggerRef.current.contains(target)
      ) {
        return;
      }

      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.key !== "Escape") return;
      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div {...rest}>
      <button
        ref={triggerRef}
        type="button"
        className={`rounded-full ${
          dropdownOpen
            ? "bg-gray-100 text-gray-500 dark:bg-gray-700/60 dark:text-gray-400"
            : "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        }`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen((open) => !open)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Menu</span>
        <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="2" />
          <circle cx="10" cy="16" r="2" />
          <circle cx="22" cy="16" r="2" />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className={`absolute top-full z-10 mt-1 min-w-36 origin-top-right overflow-hidden rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg dark:border-gray-700/60 dark:bg-gray-800 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <ul
            ref={dropdownRef}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            {children}
          </ul>
        </div>
      )}
    </div>
  );
}
