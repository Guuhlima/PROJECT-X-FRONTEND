"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BadgePercent,
  Boxes,
  Newspaper,
} from "lucide-react";

import {
  newsroomHighlights,
  promotionWatch,
  stockMovements,
  warehouseNews,
} from "../data";

const highlightToneClasses = {
  positive: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  negative: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
  neutral: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
};

const newsToneClasses = {
  sky: "bg-sky-500/10 text-sky-700 ring-sky-200 dark:text-sky-300 dark:ring-sky-900/60",
  amber: "bg-amber-500/10 text-amber-700 ring-amber-200 dark:text-amber-300 dark:ring-amber-900/60",
  emerald: "bg-emerald-500/10 text-emerald-700 ring-emerald-200 dark:text-emerald-300 dark:ring-emerald-900/60",
  rose: "bg-rose-500/10 text-rose-700 ring-rose-200 dark:text-rose-300 dark:ring-rose-900/60",
};

const movementToneClasses = {
  "Alta procura": "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "Reposicao critica": "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  Estavel: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

export default function HomeNewsroom() {
  return (
    <>
      {newsroomHighlights.map((item) => (
        <article
          key={item.title}
          className="col-span-full rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900 sm:col-span-6 sm:p-5 xl:col-span-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</span>
            <Activity className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{item.value}</div>
          <div
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${highlightToneClasses[item.tone]}`}
          >
            {item.change}
          </div>
        </article>
      ))}

      <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 xl:col-span-7">
        <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-5">
          <header className="flex items-start gap-2">
            <Newspaper className="h-5 w-5 text-slate-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Newsroom operacional</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Atualizacoes gerais sobre armazens, estoques e movimentacoes.
              </p>
            </div>
          </header>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5">
          {warehouseNews.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${newsToneClasses[item.tone]}`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{item.summary}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900 xl:col-span-5">
        <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-5">
          <header className="flex items-start gap-2">
            <Boxes className="h-5 w-5 text-slate-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Produtos com mais giro</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Entradas e saidas mais relevantes do periodo.
              </p>
            </div>
          </header>
        </div>

        <div className="space-y-3 px-4 py-4 sm:px-5">
          {stockMovements.map((item) => {
            const strongerOutput = item.outbound > item.inbound;

            return (
              <div
                key={item.sku}
                className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.product}</h3>
                    <p className="text-xs text-gray-400">SKU {item.sku}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${movementToneClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70">
                    <div className="text-xs text-gray-400">Entradas</div>
                    <div className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{item.inbound}</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70">
                    <div className="text-xs text-gray-400">Saidas</div>
                    <div className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{item.outbound}</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70">
                    <div className="text-xs text-gray-400">Saldo</div>
                    <div className="mt-1 flex items-center gap-1 font-semibold text-gray-900 dark:text-gray-100">
                      {strongerOutput ? (
                        <ArrowDownRight className="h-4 w-4 text-rose-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      )}
                      {item.balance}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </article>

      <article className="col-span-full rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-5">
          <header className="flex items-start gap-2">
            <BadgePercent className="h-5 w-5 text-slate-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Radar de promocoes externas</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Campanhas em sites e marketplaces com potencial de impactar o estoque.
              </p>
            </div>
          </header>
        </div>

        <div className="grid gap-4 px-4 py-4 sm:px-5 lg:grid-cols-3">
          {promotionWatch.map((item) => (
            <div
              key={`${item.store}-${item.campaign}`}
              className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="text-sm font-semibold text-slate-500">{item.store}</div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{item.campaign}</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Foco:</span> {item.focus}
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Janela:</span> {item.window}
                </p>
                <p>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Impacto:</span> {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
