'use client';

import ChatLandingShell from './ChatLandingShell';
import PromptCards from './PromptCards';
import ComposerBox from './ComposerBox';
import type { Message } from './ChatMessages';
import ChatMessages from './ChatMessages';
import { useChatController } from '../../../../shared/hooks/useChatController';

type Props = {
    initialMessages?: Message[];
    suggestions: string[];
    showMessages?: boolean;
    className?: string;
};

export default function ChatHome({
    initialMessages = [],
    suggestions,
    showMessages = true,
    className,
}: Props) {
    const chat = useChatController({
        initialMessages,
        suggestions,
        maxChars: 4000,
        onSend: async (userInput: string) => {
            return new Promise<string>((resolve) => {
                setTimeout(() => {
                    resolve(`Resposta simulada para: "${userInput}"`);
                }, 1500);
            });
        }
    });

    const hasNewMessages = chat.messages.length > initialMessages.length;
    const isChatMode = chat.inputLen > 0 || hasNewMessages;

    return (
        <ChatLandingShell
            titleTop="Hello there,"
            titleBottom="How can I help you?"
            subtitle={
                <>
                    Use um dos prompts abaixo <br />
                    ou escreva o seu para começar
                </>
            }
            className={className}
            isChatMode={isChatMode}
        >
            <div
                className={`transition-all duration-500 ease-out ${isChatMode
                    ? 'opacity-0 blur-sm -translate-y-2 pointer-events-none'
                    : 'opacity-100 blur-0 translate-y-0'
                    }`}
            >
                <PromptCards suggestions={chat.suggestions} onPick={chat.setSuggestion} />
            </div>

            {showMessages && (
                <div
                    className={`transition-all duration-500 ease-out ${isChatMode
                        ? 'opacity-100 blur-0 translate-y-0 max-h-[calc(100vh-220px)] overflow-hidden'
                        : 'opacity-0 blur-sm translate-y-2 pointer-events-none max-h-0 overflow-hidden'
                        }`}
                >
                    <ChatMessages messages={chat.messages} />
                </div>
            )}

            <div
                className={`transition-all duration-500 ease-out ${isChatMode
                    ? 'fixed left-1/2 bottom-6 z-[110] w-[90%] max-w-2xl -translate-x-1/2'
                    : 'static w-auto'
                    }`}
            >
                <ComposerBox
                    value={chat.input}
                    onChange={chat.setInput}
                    onSend={chat.send}
                    countText={`${chat.inputLen}/${chat.maxChars}`}
                    placeholder="Digite sua pergunta aqui..."
                />
            </div>
        </ChatLandingShell>
    );
}
