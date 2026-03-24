"use client";

import { BarChart3, Newspaper } from "lucide-react";

import type { HomeViewMode } from "../data";

type HomeViewToggleProps = {
  view: HomeViewMode;
  onChange: (view: HomeViewMode) => void;
};

const views = [
  {
    id: "dashboard" as const,
    label: "Visao gerencial",
    description: "Graficos e indicadores executivos",
    icon: BarChart3,
  },
  {
    id: "newsroom" as const,
    label: "Newsroom",
    description: "Noticias, giro e promocoes",
    icon: Newspaper,
  },
];

export default function HomeViewToggle({ view, onChange }: HomeViewToggleProps) {
  return (
    <div className="col-span-full flex justify-stretch sm:justify-end">
      <div className="grid w-full grid-cols-1 rounded-2xl border border-gray-200 bg-white/90 p-1 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 sm:inline-flex sm:w-auto sm:grid-cols-none">
        {views.map(({ id, label, description, icon: Icon }) => {
          const active = view === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition cursor-pointer sm:min-w-55 ${
                active
                  ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
              aria-pressed={active}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  active
                    ? "bg-white/15 dark:bg-slate-200"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span
                  className={`block text-xs leading-5 ${
                    active ? "text-white/70 dark:text-slate-600" : "text-gray-400"
                  }`}
                >
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
