'use client';

import { useEffect, useRef } from 'react';

export type Role = 'assistant' | 'user';

export type Message = {
    id: string;
    role: Role;
    text: string;
    time: string;
};

type ChatMessagesProps = {
    messages: Message[];
    className?: string;
};

export default function ChatMessages({ messages, className }: ChatMessagesProps) {
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = viewportRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages.length]);

    return (
        <div
            className={`flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 ${className ?? ''
                }`}
        >
            <div
                ref={viewportRef}
                className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
            >
                {messages.map((message) => {
                    const isAssistant = message.role === 'assistant';

                    return (
                        <div
                            key={message.id}
                            className={`flex flex-col gap-2 ${isAssistant ? 'items-start' : 'items-end'}`}
                            data-role={message.role}
                            data-mid={message.id}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isAssistant
                                        ? 'border border-slate-200 bg-white text-slate-700 shadow-sm'
                                        : 'bg-slate-900 text-white shadow-sm'
                                    }`}
                            >
                                {message.text}
                            </div>

                            <span className="text-xs text-slate-400">{message.time}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
