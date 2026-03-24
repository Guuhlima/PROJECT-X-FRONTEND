"use client";

import type { ChartData, ChartOptions, ScriptableContext } from "chart.js";

import { chartAreaGradient } from "./ChartjsConfig"; 
import { adjustColorOpacity, getCssVariable } from "./Utils"; 

export type SummaryCardData = {
  title: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative";
  data: ChartData<"line">;
};

const violet = "--color-violet-500";
const gray = "--color-gray-400";
const blue = "--color-sky-500";

const buildSummaryData = (
  primary: number[],
  secondary: number[],
): ChartData<"line"> => ({
  labels: primary.map((_, index) => `2025-${String(index + 1).padStart(2, "0")}-01`),
  datasets: [
    {
      data: primary,
      fill: true,
      borderColor: getCssVariable(violet, "#7c3aed"),
      backgroundColor: (context: ScriptableContext<"line">) => {
        const { ctx, chartArea } = context.chart;
        return chartAreaGradient(ctx, chartArea, [
          { stop: 0, color: adjustColorOpacity(getCssVariable(violet, "#7c3aed"), 0) },
          { stop: 1, color: adjustColorOpacity(getCssVariable(violet, "#7c3aed"), 0.18) },
        ]);
      },
      borderWidth: 2,
      pointBackgroundColor: getCssVariable(violet, "#7c3aed"),
      pointHoverBackgroundColor: getCssVariable(violet, "#7c3aed"),
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      clip: 20,
    },
    {
      data: secondary,
      borderColor: adjustColorOpacity(getCssVariable(gray, "#9ca3af"), 0.45),
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointBackgroundColor: "transparent",
      pointHoverBackgroundColor: "transparent",
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      clip: 20,
    },
  ],
});

export const summaryOptions: ChartOptions<"line"> = {
  scales: {
    x: { display: false },
    y: { display: false },
  },
  elements: {
    line: { tension: 0.35 },
    point: { radius: 0, hoverRadius: 4 },
  },
};

export const summaryCards: SummaryCardData[] = [
  {
    title: "Transferencias Concluidas",
    label: "Ultimos 30 dias",
    value: "1.248",
    delta: "+49%",
    deltaTone: "positive",
    data: buildSummaryData(
      [58, 47, 46, 35, 46, 32, 48, 22, 31, 28, 21, 37, 29, 48, 41],
      [50, 39, 34, 33, 34, 25, 32, 25, 21, 29, 28, 19, 25, 55, 43],
    ),
  },
  {
    title: "Alertas Operacionais",
    label: "Ocorrencias abertas",
    value: "37",
    delta: "-14%",
    deltaTone: "negative",
    data: buildSummaryData(
      [47, 34, 29, 20, 28, 18, 31, 29, 20, 19, 39, 45, 57, 49, 50],
      [52, 39, 38, 39, 25, 39, 47, 24, 15, 18, 12, 23, 31, 40, 37],
    ),
  },
  {
    title: "Licencas dos Armazens",
    label: "Unidades ativas",
    value: "92",
    delta: "+49%",
    deltaTone: "positive",
    data: buildSummaryData(
      [41, 36, 31, 34, 28, 30, 23, 29, 25, 31, 42, 25, 24, 14, 61, 28, 31],
      [49, 35, 35, 34, 29, 25, 27, 35, 47, 18, 17, 26, 22, 21, 27, 49, 40],
    ),
  },
];

export const directVsIndirectData: ChartData<"bar"> = {
  labels: ["Dec 22", "Jan 23", "Feb 23", "Mar 23", "Apr 23", "May 23"],
  datasets: [
    {
      label: "Direta",
      data: [800, 1600, 900, 1300, 1950, 1700],
      backgroundColor: getCssVariable(blue, "#38bdf8"),
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    },
    {
      label: "Via hub",
      data: [4900, 2600, 5300, 4800, 5200, 4800],
      backgroundColor: getCssVariable(violet, "#7c3aed"),
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    },
  ],
};

export const directVsIndirectOptions: ChartOptions<"bar"> = {
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: getCssVariable("--color-gray-400", "#9ca3af"),
        font: { size: 12, weight: 500 },
      },
    },
    y: {
      beginAtZero: true,
      max: 6000,
      border: { display: false },
      grid: {
        color: adjustColorOpacity(getCssVariable("--color-gray-200", "#e5e7eb"), 0.8),
      },
      ticks: {
        stepSize: 2000,
        color: getCssVariable("--color-gray-400", "#9ca3af"),
        callback: (value) => `$${Number(value) / 1000}K`,
      },
    },
  },
};

export const realtimeData: ChartData<"line"> = {
  labels: [
    "23:28:59",
    "23:29:04",
    "23:29:09",
    "23:29:14",
    "23:29:19",
    "23:29:24",
    "23:29:29",
    "23:29:34",
    "23:29:39",
    "23:29:44",
    "23:29:49",
    "23:29:54",
    "23:29:59",
    "23:30:04",
    "23:30:09",
    "23:30:14",
    "23:30:19",
    "23:30:24",
  ],
  datasets: [
    {
      data: [52, 53, 57, 54, 58, 55, 59, 61, 63, 66, 64, 62, 60, 54, 52, 48, 50, 54],
      fill: true,
      borderColor: getCssVariable(violet, "#7c3aed"),
      backgroundColor: (context: ScriptableContext<"line">) => {
        const { ctx, chartArea } = context.chart;
        return chartAreaGradient(ctx, chartArea, [
          { stop: 0, color: adjustColorOpacity(getCssVariable(violet, "#7c3aed"), 0) },
          { stop: 1, color: adjustColorOpacity(getCssVariable(violet, "#7c3aed"), 0.14) },
        ]);
      },
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: getCssVariable(violet, "#7c3aed"),
      pointHoverBackgroundColor: getCssVariable(violet, "#7c3aed"),
      pointBorderWidth: 0,
      pointHoverBorderWidth: 0,
      tension: 0.35,
    },
  ],
};

export const realtimeOptions: ChartOptions<"line"> = {
  layout: { padding: { left: 8, right: 8, top: 8, bottom: 0 } },
  scales: {
    x: {
      type: "category",
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: getCssVariable("--color-gray-400", "#9ca3af"),
        autoSkip: true,
        maxTicksLimit: 6,
      },
    },
    y: {
      min: 20,
      max: 80,
      border: { display: false },
      grid: {
        color: adjustColorOpacity(getCssVariable("--color-gray-200", "#e5e7eb"), 0.8),
      },
      ticks: {
        color: getCssVariable("--color-gray-400", "#9ca3af"),
        stepSize: 20,
        callback: (value) => `$${value}`,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: (items) => items[0]?.label ?? "",
        label: (context) => `$${(context.parsed.y ?? 0).toFixed(2)}`,
      },
    },
  },
};
