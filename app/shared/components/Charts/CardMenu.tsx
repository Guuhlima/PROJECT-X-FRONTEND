"use client";

import Link from "next/link";

import EditMenu from "../Dropdown/EditMenu";

const menuItems = [
  { label: "Ver detalhes", href: "#0" },
  { label: "Exportar", href: "#0" },
  { label: "Remover", href: "#0", destructive: true },
];

export default function CardMenu() {
  return (
    <EditMenu align="right" className="relative inline-flex">
      {menuItems.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`flex px-3 py-1 text-sm font-medium ${
              item.destructive
                ? "text-red-500 hover:text-red-600"
                : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </EditMenu>
  );
}
