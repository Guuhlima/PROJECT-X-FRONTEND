"use client";

import { BarChart3, Newspaper } from "lucide-react";
import type { HomeViewMode } from "../data";

interface HomeViewToggleProps {
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

export function HomeViewToggle({ view, onChange }: HomeViewToggleProps) {
  return (
    <div className="col-span-full flex justify-stretch sm:justify-end">
      <div className="grid w-full grid-cols-1 rounded-2xl border border-border bg-card/90 p-1 shadow-sm backdrop-blur sm:inline-flex sm:w-auto sm:grid-cols-none">
        {views.map(({ id, label, description, icon: Icon }) => {
          const active = view === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition cursor-pointer sm:min-w-55 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
              aria-pressed={active}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  active
                    ? "bg-primary-foreground/15"
                    : "bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{label}</span>
                <span
                  className={`block text-xs leading-5 ${
                    active ? "text-primary-foreground/70" : "text-muted-foreground"
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
