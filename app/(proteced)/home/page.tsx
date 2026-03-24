import { CardTrack } from "./components/TextLoop";
import HomePanel from "./components/HomePanel";
import TrackingChatWidget from "@/app/shared/components/TrackingChatWidget";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <CardTrack />
      <TrackingChatWidget />
      <HomePanel />
    </div>
  );
}
