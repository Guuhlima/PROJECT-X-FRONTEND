"use client";

import { useMemo, useState } from "react";

import DashboardCard from "@/app/shared/components/Charts/DashboardCard";

import type { HomeViewMode } from "../data";
import HomeNewsroom from "./HomeNewsroom";
import HomeViewToggle from "./HomeViewToggle";

export default function HomePanel() {
  const [view, setView] = useState<HomeViewMode>("dashboard");

  const helperText = useMemo(() => {
    if (view === "dashboard") {
      return "Use esta visao para acompanhar indicadores executivos e desempenho operacional consolidado.";
    }

    return "Use esta visao para ler noticias do armazem, identificar produtos de maior giro e monitorar promocoes externas.";
  }, [view]);

  return (
    <div className="grid grid-cols-12 gap-4 pb-6 sm:gap-6 lg:ml-12">
      <HomeViewToggle view={view} onChange={setView} />

      <section
        className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white/70 px-4 py-4 text-sm leading-6 text-gray-600 shadow-xs dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300 sm:px-5"
      >
        {helperText}
      </section>

      {view === "dashboard" ? <DashboardCard /> : <HomeNewsroom />}
    </div>
  );
}
