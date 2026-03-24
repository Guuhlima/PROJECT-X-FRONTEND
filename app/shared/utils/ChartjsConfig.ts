import { Chart, Tooltip } from "chart.js";
import { adjustColorOpacity, getCssVariable } from "./Utils";

Chart.register(Tooltip);

Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = 500;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = "nearest";
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = "nearest";
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.padding = 8;

type ColorStop = {
  stop: number;
  color: string;
};

export const chartAreaGradient = (
  ctx: CanvasRenderingContext2D | null | undefined,
  chartArea: { bottom: number; top: number } | null | undefined,
  colorStops: ColorStop[],
) => {
  if (!ctx || !chartArea || colorStops.length === 0) {
    return "transparent";
  }

  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  colorStops.forEach(({ stop, color }) => {
    gradient.addColorStop(stop, color);
  });

  return gradient;
};

const tw = {
  white: "--color-white",
  gray100: "--color-gray-100",
  gray200: "--color-gray-200",
  gray400: "--color-gray-400",
  gray500: "--color-gray-500",
  gray600: "--color-gray-600",
  gray700: "--color-gray-700",
  gray800: "--color-gray-800",
};

export const chartColors = {
  textColor: {
    light: getCssVariable(tw.gray400, "#9ca3af"),
    dark: getCssVariable(tw.gray500, "#6b7280"),
  },
  gridColor: {
    light: getCssVariable(tw.gray100, "#f3f4f6"),
    dark: adjustColorOpacity(getCssVariable(tw.gray700, "#374151"), 0.6),
  },
  backdropColor: {
    light: getCssVariable(tw.white, "#ffffff"),
    dark: getCssVariable(tw.gray800, "#1f2937"),
  },
  tooltipTitleColor: {
    light: getCssVariable(tw.gray800, "#1f2937"),
    dark: getCssVariable(tw.gray100, "#f3f4f6"),
  },
  tooltipBodyColor: {
    light: getCssVariable(tw.gray500, "#6b7280"),
    dark: getCssVariable(tw.gray400, "#9ca3af"),
  },
  tooltipBgColor: {
    light: getCssVariable(tw.white, "#ffffff"),
    dark: getCssVariable(tw.gray700, "#374151"),
  },
  tooltipBorderColor: {
    light: getCssVariable(tw.gray200, "#e5e7eb"),
    dark: getCssVariable(tw.gray600, "#4b5563"),
  },
};
