"use client";

import DirectVsHubChartCard from "./DirectVsHubChartCard";
import LeadTimeChartCard from "./LeadTimeChartCard";
import SummaryChartCard from "./SummaryChartCard";
import { summaryCards } from "../../utils/chartData"; 

export default function DashboardCard() {
  return (
    <>
      {summaryCards.map((card) => (
        <SummaryChartCard key={card.title} {...card} />
      ))}
      <DirectVsHubChartCard />
      <LeadTimeChartCard />
    </>
  );
}
