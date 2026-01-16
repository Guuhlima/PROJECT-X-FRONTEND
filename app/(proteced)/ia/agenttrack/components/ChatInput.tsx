import { Send } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
        <textarea
          rows={1}
          placeholder="Digite uma pergunta sobre rotas, alertas ou KPIs..."
          className="min-h-[40px] w-full resize-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Enviar mensagem"
          className="flex h-10 w-10 items-center justify-center rounded-full"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
