'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCheck, MessageCircle, Paperclip, Send, X } from 'lucide-react';

type Attachment = {
  name: string;
  size: string;
};

type Message = {
  id: string;
  role: 'client' | 'branch';
  text?: string;
  time: string;
  attachment?: Attachment;
  status?: 'sent' | 'read';
};

const initialMessages: Message[] = [
  {
    id: 'm1',
    role: 'branch',
    text: 'Oi! Sou a equipe da filial de rastreamento. Como posso ajudar?',
    time: '09:12',
  },
  {
    id: 'm2',
    role: 'client',
    text: 'Preciso do status da entrega do pedido #A9093.',
    time: '09:13',
    status: 'read',
  },
];

const mockReplies = [
  'Já localizei seu pedido. Ele está em rota de entrega.',
  'A previsão é chegar ainda hoje entre 14h e 16h.',
  'Se quiser, posso enviar o comprovante assim que for entregue.',
];

const mockAttachments: Attachment[] = [
  { name: 'Comprovante_Rota.pdf', size: '220kb' },
  { name: 'Foto_Entrega.jpg', size: '1.2mb' },
];

const nextId = () => Math.random().toString(36).slice(2, 9);

const nowTime = () =>
  new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function TrackingChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const replyIndexRef = useRef(0);

  const lastClientMessageId = useMemo(() => {
    const lastClient = [...messages].reverse().find((message) => message.role === 'client');
    return lastClient?.id ?? null;
  }, [messages]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const queueTimeout = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  };

  const pushMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const clientMessage: Message = {
      id: nextId(),
      role: 'client',
      text: trimmed,
      time: nowTime(),
      status: 'sent',
    };

    pushMessage(clientMessage);
    setInput('');

    queueTimeout(() => {
      setIsTyping(true);
    }, 250);

    queueTimeout(() => {
      setIsTyping(false);
      const reply = mockReplies[replyIndexRef.current % mockReplies.length];
      replyIndexRef.current += 1;
      pushMessage({
        id: nextId(),
        role: 'branch',
        text: reply,
        time: nowTime(),
      });
    }, 1200);

    queueTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === clientMessage.id ? { ...message, status: 'read' } : message
        )
      );
    }, 1800);
  };

  const handleAttach = () => {
    const attachment = mockAttachments[Math.floor(Math.random() * mockAttachments.length)];
    const clientMessage: Message = {
      id: nextId(),
      role: 'client',
      text: 'Enviei um anexo.',
      time: nowTime(),
      attachment,
      status: 'sent',
    };

    pushMessage(clientMessage);

    queueTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === clientMessage.id ? { ...message, status: 'read' } : message
        )
      );
    }, 1400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120]">
      {open ? (
        <div className="flex h-[540px] w-[360px] flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
                Filial de Rastreamento
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online agora
                {isTyping ? <span className="text-slate-400">• digitando...</span> : null}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
              aria-label="Fechar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-slate-50 px-4 py-5">
            {messages.map((message) => {
              const isClient = message.role === 'client';
              return (
                <div
                  key={message.id}
                  className={`flex flex-col gap-2 ${isClient ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isClient
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {message.text}
                    {message.attachment ? (
                      <div className="mt-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs">
                        <p className="font-semibold">{message.attachment.name}</p>
                        <p className="text-white/70">{message.attachment.size}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{message.time}</span>
                    {isClient && message.id === lastClientMessageId ? (
                      <span className="flex items-center gap-1 text-emerald-500">
                        <CheckCheck size={14} />
                        {message.status === 'read' ? 'Lida' : 'Enviada'}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
            {isTyping ? (
              <div className="flex items-start">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-300" />
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:120ms]" />
                  <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:240ms]" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 bg-white px-4 py-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
              <button
                type="button"
                onClick={handleAttach}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-white"
                aria-label="Adicionar anexo"
              >
                <Paperclip size={18} />
              </button>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                aria-label="Enviar mensagem"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl transition hover:scale-[1.02]"
        >
          <MessageCircle size={22} />
        </button>
      ) : null}
    </div>
  );
}
