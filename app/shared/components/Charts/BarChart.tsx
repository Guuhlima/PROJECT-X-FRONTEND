"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";

import { chartColors } from "../../utils/ChartjsConfig";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarChartProps = {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
  width?: number;
  height?: number;
};

const getBaseOptions = (darkMode: boolean): ChartOptions<"bar"> => {
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  return {
    maintainAspectRatio: false,
    resizeDelay: 200,
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
        backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
        borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
      },
    },
  };
};

export default function BarChart({ data, options, width, height }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"bar"> | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const syncTheme = () => setDarkMode(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current;

    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
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
        ...options?.scales,
      },
    };

    chart.update("none");
  }, [data, darkMode, options]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
