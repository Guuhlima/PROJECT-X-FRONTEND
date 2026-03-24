import { CardTrack } from "./components/TextLoop";
import TrackingChatWidget from "@/app/shared/components/TrackingChatWidget";
import DashboardCard from "@/app/shared/components/Charts/DashboardCard";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-y-auto px-6 py-8 xl:px-10">
      <CardTrack />
      <TrackingChatWidget />
      
      <div className="ml-12 grid grid-cols-12 gap-6">
        <DashboardCard />
      </div>
    </div>
  );
}
