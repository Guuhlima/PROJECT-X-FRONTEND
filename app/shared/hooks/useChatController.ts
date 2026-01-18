'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

export type Role = 'assistant' | 'user';

export type Message = {
  id: string;
  role: Role;
  text: string;
  time: string;
};

type UseChatControllerArgs = {
  initialMessages?: Message[];
  maxChars?: number;
  suggestions?: string[];
  onSend?: (text: string) => Promise<string | void> | (string | void); 
  // onSend pode retornar uma resposta do "assistant" (string) ou void
};

function nowHHMM() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

function uid(prefix = 'm') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function useChatController({
  initialMessages = [],
  maxChars = 4000,
  suggestions = [],
  onSend,
}: UseChatControllerArgs) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const inputLen = input.length;
  const remaining = maxChars - inputLen;
  const canSend = useMemo(() => {
    return !sending && input.trim().length > 0 && inputLen <= maxChars;
  }, [sending, input, inputLen, maxChars]);

  const setSuggestion = useCallback((text: string) => {
    setInput(text);
  }, []);

  const pushMessage = useCallback((role: Role, text: string) => {
    const msg: Message = { id: uid(), role, text, time: nowHHMM() };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending || text.length > maxChars) return;

    setSending(true);
    setInput('');
    pushMessage('user', text);

    try {
      const maybeAssistant = await onSend?.(text);

      if (typeof maybeAssistant === 'string' && maybeAssistant.trim()) {
        pushMessage('assistant', maybeAssistant.trim());
      }
    } finally {
      setSending(false);
    }
  }, [input, sending, maxChars, onSend, pushMessage]);

  return {
    messages,
    input,
    setInput,
    sending,
    canSend,
    inputLen,
    remaining,
    maxChars,
    suggestions,
    setSuggestion,
    send,
    pushMessage, // útil se quiser empurrar mensagens externamente
    setMessages, // útil p/ reset
  };
}
