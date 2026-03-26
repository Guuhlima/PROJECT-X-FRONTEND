import HomePanel from "./components/HomePanel";
import TrackingChatWidget from "@/app/shared/components/TrackingChatWidget";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-y-auto bg-muted/30 px-4 py-6 dark:bg-linear-to-tr dark:from-background dark:to-muted sm:px-6 sm:py-8 xl:px-10">
      <TrackingChatWidget />
      <HomePanel />
    </div>
  );
}
