"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
  CategoryScale,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import "chartjs-adapter-moment";

import { chartColors } from "../../utils/ChartjsConfig";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend,
);

type LineChartProps = {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  width?: number;
  height?: number;
};

const formatValue = (value: number | null) => {
  if (value === null) return "";
  return new Intl.NumberFormat("pt-BR").format(value);
};

const getBaseOptions = (
  darkMode: boolean,
): ChartOptions<"line"> => {
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  return {
    layout: { padding: 20 },
    scales: {
      y: { display: false, beginAtZero: true },
      x: { display: false },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: () => "",
          label: (context) => formatValue(context.parsed.y),
        },
        bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
        backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
        borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
      },
      legend: { display: false },
    },
    interaction: { intersect: false, mode: "nearest" },
    maintainAspectRatio: false,
    resizeDelay: 200,
  };
};

export default function LineChart({ data, options, width, height }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"line"> | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => {
      setDarkMode(root.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current;

    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: { datasets: [] },
      options: getBaseOptions(darkMode),
    });

    chartRef.current = chart;

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, [darkMode]);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    chart.data = data;
    chart.options = {
      ...getBaseOptions(darkMode),
      ...options,
      plugins: {
        ...getBaseOptions(darkMode).plugins,
        ...options?.plugins,
        tooltip: {
          ...getBaseOptions(darkMode).plugins?.tooltip,
          ...options?.plugins?.tooltip,
        },
        legend: {
          ...getBaseOptions(darkMode).plugins?.legend,
          ...options?.plugins?.legend,
        },
      },
      scales: {
        ...getBaseOptions(darkMode).scales,
        ...options?.scales,
      },
    };

    chart.update("none");
  }, [data, darkMode, options]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
