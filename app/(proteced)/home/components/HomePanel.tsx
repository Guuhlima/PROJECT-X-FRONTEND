"use client";

import { useMemo } from "react";
import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";
import {
  AlertTriangle,
  Boxes,
  CheckCheck,
  ChevronRight,
  Clock3,
  Truck,
} from "lucide-react";

import LineChart from "@/app/shared/components/Charts/LineChart";
import { chartAreaGradient } from "@/app/shared/utils/ChartjsConfig";
import { adjustColorOpacity, getCssVariable } from "@/app/shared/utils/Utils";
import { commandCards, networkNodes, recentActivity } from "../data";
import HomeNewsroom from "./HomeNewsroom";

const cardToneClasses = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  slate: "bg-muted text-foreground",
};

const activityToneClasses = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
  rose: "bg-rose-500/12 text-rose-600 dark:text-rose-400",
};

const activityBadgeClasses = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  amber: "bg-amber-500/12 text-amber-700 dark:text-amber-400",
  rose: "bg-rose-500/12 text-rose-700 dark:text-rose-400",
};

export default function HomePanel() {
  const view = "dashboard";

  const helperText = useMemo(() => {
    if (view === "dashboard") {
      return "Visao consolidada do seu ecossistema de armazens, rastreamento e abastecimento.";
    }

    return "Leitura operacional com noticias, produtos de maior giro e sinais de mercado.";
  }, [view]);

  const efficiencyChart = useMemo(() => {
    const primary = getCssVariable("--primary", "#1d4ed8");
    const muted = getCssVariable("--muted-foreground", "#94a3b8");

    const data: ChartData<"line"> = {
      labels: ["WK 01", "WK 02", "WK 03", "WK 04"],
      datasets: [
        {
          label: "Target",
          data: [760, 820, 890, 930],
          borderColor: adjustColorOpacity(muted, 0.28),
          backgroundColor: (context: ScriptableContext<"line">) => {
            const { ctx, chartArea } = context.chart;
            return chartAreaGradient(ctx, chartArea, [
              { stop: 0, color: adjustColorOpacity(muted, 0.04) },
              { stop: 1, color: adjustColorOpacity(muted, 0.14) },
            ]);
          },
          fill: true,
          tension: 0.42,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
        },
        {
          label: "Throughput",
          data: [620, 540, 1240, 780],
          borderColor: primary,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const { ctx, chartArea } = context.chart;
            return chartAreaGradient(ctx, chartArea, [
              { stop: 0, color: adjustColorOpacity(primary, 0.02) },
              { stop: 1, color: adjustColorOpacity(primary, 0.16) },
            ]);
          },
          fill: false,
          tension: 0.42,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: primary,
          pointHoverBackgroundColor: primary,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          borderWidth: 3,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      layout: { padding: { left: 8, right: 12, top: 12, bottom: 8 } },
      scales: {
        x: {
          display: true,
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: adjustColorOpacity(muted, 0.8),
            font: { size: 11, weight: 600 },
            padding: 14,
          },
        },
        y: {
          display: false,
          beginAtZero: false,
          min: 350,
          max: 1400,
        },
      },
      elements: {
        line: { capBezierPoints: true },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => items[0]?.label ?? "",
            label: (context) => `${context.dataset.label}: ${new Intl.NumberFormat("pt-BR").format(context.parsed.y!)} pkgs/hr`,
          },
        },
      },
    };

    return { data, options };
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 pb-6 pt-24 sm:gap-6 lg:ml-12 lg:pt-28">
      {/* <HomeViewToggle view={view} onChange={setView} /> */}

      {view === "dashboard" ? (
        <>
          {commandCards.map((card) => (
            <article
              key={card.title}
              className="col-span-full rounded-3xl border border-border bg-card/95 p-5 shadow-sm sm:col-span-6 xl:col-span-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cardToneClasses[card.tone]}`}>
                  {card.title.includes("Estoque") ? (
                    <Boxes className="h-5 w-5" />
                  ) : card.title.includes("Transferencias") ? (
                    <Truck className="h-5 w-5" />
                  ) : (
                    <CheckCheck className="h-5 w-5" />
                  )}
                </div>
                <span className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {card.badge}
                </span>
              </div>
              <div className="mt-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {card.title}
                </div>
                <div className="mt-2 text-4xl font-semibold tracking-tight">{card.value}</div>
                <div className="mt-3 text-sm font-medium text-primary">{card.change}</div>
              </div>
            </article>
          ))}

          <section className="col-span-full rounded-3xl border border-border bg-card/95 p-6 shadow-sm xl:col-span-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Eficiência dos armazéns</h2>
                <p className="text-sm text-muted-foreground">
                  Throughput comparado a capacidade planejada nos ultimos 30 dias.
                </p>
              </div>
              <div className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  Throughput
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                  Target
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] bg-muted/40 p-4 sm:p-6">
              <div className="relative h-[310px] w-full overflow-hidden rounded-[1.75rem] bg-linear-to-b from-background/70 to-muted/20">
                <div className="h-full w-full px-2 pt-4">
                  <LineChart data={efficiencyChart.data} options={efficiencyChart.options} />
                </div>

                <div className="absolute left-[57%] top-[20%] rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Pico de eficiência
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-primary">1,240 pkgs/hr</div>
                </div>
              </div>
            </div>
          </section>

          <section className="col-span-full rounded-3xl border border-border bg-card/95 p-6 shadow-sm xl:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">Atividade recente</h2>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80">
                Ver tudo
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {recentActivity.map((item) => (
                <article key={item.title} className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${activityToneClasses[item.tone]}`}>
                    {item.tone === "amber" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : item.tone === "emerald" ? (
                      <Boxes className="h-4 w-4" />
                    ) : item.tone === "rose" ? (
                      <Clock3 className="h-4 w-4" />
                    ) : (
                      <Truck className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-5">{item.title}</h3>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${activityBadgeClasses[item.tone]}`}>
                      {item.badge}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* <section className="col-span-full overflow-hidden rounded-3xl border border-border bg-card/95 shadow-sm">
            <div className="relative min-h-[300px] p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.28),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.14),transparent_26%),linear-gradient(180deg,rgba(148,163,184,0.22),rgba(15,23,42,0.86))] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.09),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.12),transparent_24%),linear-gradient(180deg,rgba(71,85,105,0.18),rgba(2,6,23,0.92))]" />
              <div className="absolute inset-x-6 top-6 bottom-6 rounded-[2.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm" />

              <div className="relative flex min-h-[300px] flex-col justify-between gap-8">
                <div className="relative h-[190px] overflow-hidden rounded-[2rem]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_46%)]" />
                  <div className="absolute inset-x-[8%] bottom-[12%] top-[10%] rotate-[-10deg] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.025))] shadow-[0_24px_60px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]" />
                  <div className="absolute inset-x-[13%] bottom-[19%] top-[21%] rotate-[-10deg] rounded-[1.8rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />

                  <div className="absolute left-[18%] top-[30%] h-18 w-24 rotate-[-10deg] rounded-[1.4rem] border border-white/12 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
                  <div className="absolute left-[29%] top-[19%] h-26 w-52 rotate-[-10deg] rounded-[1.5rem] border border-white/12 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
                  <div className="absolute left-[43%] top-[26%] h-16 w-8 rotate-[-10deg] rounded-[1rem] border border-white/10 bg-white/7" />
                  <div className="absolute left-[56%] top-[35%] h-17 w-24 rotate-[-10deg] rounded-[1.35rem] border border-white/12 bg-white/10" />
                  <div className="absolute left-[69%] top-[23%] h-24 w-18 rotate-[-10deg] rounded-[1.35rem] border border-white/12 bg-white/12" />
                  <div className="absolute left-[58%] top-[55%] h-8 w-12 rotate-[-10deg] rounded-[0.9rem] border border-white/10 bg-white/8" />
                  <div className="absolute left-[63%] top-[44%] h-7 w-9 rotate-[-10deg] rounded-[0.8rem] border border-white/10 bg-white/7" />

                  <div className="absolute left-[23%] top-[46%] h-6 w-44 rotate-[-10deg] rounded-full border border-white/7 bg-white/4" />
                  <div className="absolute left-[18%] top-[59%] h-4 w-62 rotate-[-10deg] rounded-full border border-white/7 bg-white/4" />
                  <div className="absolute left-[50%] top-[47%] h-4 w-25 rotate-[-10deg] rounded-full border border-white/6 bg-white/4" />
                  <div className="absolute left-[33%] top-[37%] h-px w-42 rotate-[-10deg] bg-white/10" />
                  <div className="absolute left-[33%] top-[42%] h-px w-42 rotate-[-10deg] bg-white/8" />
                  <div className="absolute left-[33%] top-[47%] h-px w-42 rotate-[-10deg] bg-white/8" />
                  <div className="absolute left-[33%] top-[52%] h-px w-42 rotate-[-10deg] bg-white/8" />

                  {networkNodes.map((node) => (
                    <div
                      key={node.name}
                      className="absolute"
                      style={{ left: node.x, top: node.y }}
                    >
                      <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/18 blur-lg" />
                      <span className="relative block h-5 w-5 rounded-full border-4 border-white/75 bg-primary shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />
                    </div>
                  ))}

                  <div className="absolute left-[9%] top-[15%] h-18 w-px bg-white/10" />
                  <div className="absolute left-[9%] top-[15%] pl-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
                    Recebimento
                  </div>
                  <div className="absolute left-[73%] top-[10%] h-14 w-px bg-white/10" />
                  <div className="absolute left-[73%] top-[10%] pl-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
                    Picking
                  </div>
                  <div className="absolute left-[62%] top-[65%] h-10 w-px bg-white/10" />
                  <div className="absolute left-[62%] top-[65%] pl-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
                    Expedicao
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl text-white">
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                      Network Topology
                    </div>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                      Global Transit Nodes
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">
                      Miniatura visual da operacao conectando recebimento, picking e expedicao com os polos mais ativos da rede.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[1.7rem] border border-white/12 bg-white/8 px-6 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                      <div className="text-3xl font-semibold text-white">14</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                        Active hubs
                      </div>
                    </div>
                    <div className="rounded-[1.7rem] border border-white/12 bg-white/8 px-6 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                      <div className="text-3xl font-semibold text-white">1,240</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                        Fleet units
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </>
      ) : (
        <>
          <section className="col-span-full rounded-2xl border border-dashed border-border bg-card/70 px-4 py-4 text-sm leading-6 text-muted-foreground shadow-xs sm:px-5">
            {helperText}
          </section>

          <HomeNewsroom />
        </>
      )}
    </div>
  );
}
