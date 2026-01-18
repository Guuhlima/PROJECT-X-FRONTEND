'use client';

import ChatLandingShell from './ChatLandingShell';
import PromptCards from './PromptCards';
import ComposerBox from './ComposerBox';
import type { Message } from './ChatMessages';
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
        >
            <PromptCards suggestions={chat.suggestions} onPick={chat.setSuggestion} />

            <ComposerBox
                value={chat.input}
                onChange={chat.setInput}
                onSend={chat.send}
                disabled={!chat.canSend}
                countText={`${chat.inputLen}/${chat.maxChars}`}
                placeholder="Digite sua pergunta aqui..."
            />
        </ChatLandingShell>
    );
}
