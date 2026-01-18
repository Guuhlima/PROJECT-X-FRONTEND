'use client';

import GradientText from '@/components/GradientText';
import type { ReactNode } from 'react';

type Props = {
    titleTop?: string;
    titleBottom?: string;
    subtitle?: ReactNode;
    children: ReactNode;
    className?: string;
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
}: Props) {
    return (
        <div
            className={`min-h-screen w-screen bg-gradient-to-tr from-[#eee] to-neutral-200 flex flex-col justify-center ${className ?? ''}`}
        >
            <div className="w-[80%] max-w-2xl mx-auto mt-20">
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

                <p className="text-neutral-500 leading-tight tracking-tight mb-6 text-lg">
                    {subtitle}
                </p>

                {children}
            </div>
        </div>
    );
}
