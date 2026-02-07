'use client';

import GradientText from '@/app/shared/components/GradientText';
import type { ReactNode } from 'react';

type Props = {
    titleTop?: string;
    titleBottom?: string;
    subtitle?: ReactNode;
    children: ReactNode;
    className?: string;
    isChatMode?: boolean;
};

export default function ChatLandingShell({
    titleTop = 'Hello there,',
    titleBottom = 'How can I help you?',
    subtitle = (
        <>
            Use one of the most common prompts below <br />
            or use one of your own prompt to begin
        </>
    ),
    children,
    className,
    isChatMode = false,
}: Props) {
    return (
        <div
            className={`min-h-screen w-screen bg-gradient-to-tr from-background to-muted flex flex-col ${isChatMode ? 'justify-start' : 'justify-center'} ${className ?? ''}`}
        >
            <div className={`w-[80%] max-w-2xl mx-auto mt-20 ${isChatMode ? 'pb-28' : ''}`}>
                <div
                    className={`transition-all duration-500 ease-out ${isChatMode
                        ? 'opacity-0 blur-sm -translate-y-2 pointer-events-none'
                        : 'opacity-100 blur-0 translate-y-0'
                        }`}
                >
                    <GradientText
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        animationSpeed={8}
                        showBorder={false}
                        className="custom-class"
                    >
                        <h1 className="text-5xl font-normal leading-tight">
                            {titleTop}
                        </h1>
                    </GradientText>

                    <GradientText
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        animationSpeed={8}
                        showBorder={false}
                        className="custom-class"
                    >
                        <h1 className="text-5xl font-normal leading-tight -mt-2 mb-2">
                            {titleBottom}
                        </h1>
                    </GradientText>

                    <p className="text-muted-foreground leading-tight tracking-tight mb-6 text-lg">
                        {subtitle}
                    </p>
                </div>

                {children}
            </div>
        </div>
    );
}
