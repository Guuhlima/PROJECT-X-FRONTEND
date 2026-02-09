import { Profile } from "../../shared/components/Profile";
import { CardTrack } from "./components/TextLoop";
import TrackingChatWidget from "@/app/shared/components/TrackingChatWidget";

export default function Page() {
  return (
    <div className="fixed inset-0">
      <CardTrack />
      <TrackingChatWidget />
    </div>
  );
}
