import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  time: string;
};

type ChatModalProps = {
  messages: Message[];
  suggestions: string[];
  open: boolean;
  onClose: () => void;
};

export default function ChatModal({
  messages,
  suggestions,
  open,
  onClose,
}: ChatModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/30 px-4 py-8 backdrop-blur-sm">
      <div className="flex h-[82vh] w-full max-w-3xl flex-col gap-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <ChatHeader />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
          >
            Fechar
          </button>
        </div>
        <ChatMessages messages={messages} />
        <ChatInput />
      </div>
    </div>
  );
}
