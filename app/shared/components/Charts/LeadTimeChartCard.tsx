"use client";

import LineChart from "./LineChart";
import { realtimeData, realtimeOptions } from "../../utils/chartData"; 

export default function LeadTimeChartCard() {
  return (
    <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 xl:col-span-6">
      <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-5">
        <header className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 sm:text-xl">
            Lead Time Medio
          </h2>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
            i
          </span>
        </header>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <div className="mb-6 flex flex-wrap items-start gap-3">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">53.42 min</div>
          <div className="rounded-full bg-red-500/15 px-2 py-0.5 text-sm font-medium text-red-600 dark:text-red-400">
            -1.84%
          </div>
        </div>
        <div className="h-64 sm:h-72">
          <LineChart data={realtimeData} options={realtimeOptions} />
        </div>
      </div>
    </article>
  );
}
