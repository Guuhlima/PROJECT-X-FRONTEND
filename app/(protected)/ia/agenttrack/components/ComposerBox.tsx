'use client';

import { useCallback, useEffect, useRef } from 'react';

type Props = {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    disabled?: boolean;
    countText: string;
    placeholder?: string;
};

export default function ComposerBox({
    value,
    onChange,
    onSend,
    disabled,
    countText,
    placeholder = 'Type your question here ...',
}: Props) {
    const ref = useRef<HTMLTextAreaElement>(null);

    const autosize = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = '0px';
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }, []);

    useEffect(() => {
        autosize();
    }, [value, autosize]);

    return (
        <div className="bg-card rounded-2xl shadow-md border border-border relative">
            <div className="flex">
                <textarea
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSend();
                        }
                    }}
                    className="grow m-4 outline-none min-h-16 resize-none bg-transparent text-foreground placeholder:text-muted-foreground"
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>

            <div className="flex gap-2 items-center absolute right-2 bottom-2">
                <div className="text-xs text-muted-foreground">{countText}</div>

                <button
                    type="button"
                    onClick={onSend}
                    disabled={disabled}
                    className="bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-8 h-8 p-2"
                    aria-label="Send"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="48"
                            d="M112 244l144-144l144 144"
                        />
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="48"
                            d="M256 120v292"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
