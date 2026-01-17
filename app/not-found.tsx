import Link from "next/link";
import FuzzyText from "./shared/components/FuzzyText";

export default function NotFound() {
  const enableHover = true;
  const hoverIntensity = 0.6;

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={hoverIntensity} 
          enableHover={enableHover}
        >
          404
        </FuzzyText>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/home"
            className="rounded-full bg-white text-black px-5 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Home
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold hover:border-white/60 transition"
          >
            Suport
          </Link>
        </div>
      </div>
    </main>
  );
}
