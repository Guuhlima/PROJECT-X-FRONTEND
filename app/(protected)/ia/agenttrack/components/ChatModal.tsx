'use client';

type ChatModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ChatModal({ open, onClose, children }: ChatModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/30 px-4 py-8 backdrop-blur-sm">
      <div className="h-[82vh] w-full max-w-3xl overflow-hidden rounded-[32px] border border-red-400 bg-white shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-900 z-10"
        >
          Fechar
        </button>

        <div className="h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
