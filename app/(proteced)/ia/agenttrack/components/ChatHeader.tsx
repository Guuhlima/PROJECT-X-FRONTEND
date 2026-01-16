export default function ChatHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          AgentTrack IA
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        IA ativa - online
      </div>
    </div>
  );
}
