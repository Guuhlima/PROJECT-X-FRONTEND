"use client";

import BarChart from "./BarChart";
import { directVsIndirectData, directVsIndirectOptions } from "../../utils/chartData"; 

export default function DirectVsHubChartCard() {
  return (
    <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 xl:col-span-6">
      <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-5">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 sm:text-xl">
            Expedicao Direta vs Hub
          </h2>
        </header>
      </div>
      <div className="px-4 py-4 sm:px-5">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-[3px] border-sky-400" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">8.25K</span>
            <span className="text-base text-gray-500 dark:text-gray-400 sm:text-xl">Direta</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-[3px] border-violet-500" />
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">27.7K</span>
            <span className="text-base text-gray-500 dark:text-gray-400 sm:text-xl">Via hub</span>
          </div>
        </div>
        <div className="h-64 sm:h-72">
          <BarChart data={directVsIndirectData} options={directVsIndirectOptions} />
        </div>
      </div>
    </article>
  );
}
