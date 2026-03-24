"use client";

import LineChart from "./LineChart";
import CardMenu from "./CardMenu";
import { summaryOptions, type SummaryCardData } from "../../utils/chartData"; 

export default function SummaryChartCard({
  title,
  label,
  value,
  delta,
  deltaTone,
  data,
}: SummaryCardData) {
  return (
    <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 sm:col-span-6 xl:col-span-4">
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <header className="mb-2 flex items-start justify-between">
          <h2 className="pr-3 text-base font-semibold text-gray-800 dark:text-gray-100 sm:text-lg">{title}</h2>
          <CardMenu />
        </header>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {label}
        </div>
        <div className="flex flex-wrap items-start gap-2">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 sm:text-3xl">{value}</div>
          <div
            className={`rounded-full px-2 py-0.5 text-sm font-medium ${
              deltaTone === "positive"
                ? "bg-green-500/15 text-green-700 dark:text-green-400"
                : "bg-red-500/15 text-red-600 dark:text-red-400"
            }`}
          >
            {delta}
          </div>
        </div>
      </div>
      <div className="h-32 px-2 pb-2">
        <LineChart data={data} options={summaryOptions} />
      </div>
    </article>
  );
}
