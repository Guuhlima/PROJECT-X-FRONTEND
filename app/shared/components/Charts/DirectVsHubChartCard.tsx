"use client";

import BarChart from "./BarChart";
import { directVsIndirectData, directVsIndirectOptions } from "../../utils/chartData"; 

export default function DirectVsHubChartCard() {
  return (
    <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 xl:col-span-6">
      <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Expedicao Direta vs Hub
          </h2>
        </header>
      </div>
      <div className="px-5 py-4">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-[3px] border-sky-400" />
            <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">8.25K</span>
            <span className="text-xl text-gray-500 dark:text-gray-400">Direta</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-[3px] border-violet-500" />
            <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">27.7K</span>
            <span className="text-xl text-gray-500 dark:text-gray-400">Via hub</span>
          </div>
        </div>
        <div className="h-[18rem]">
          <BarChart data={directVsIndirectData} options={directVsIndirectOptions} />
        </div>
      </div>
    </article>
  );
}
