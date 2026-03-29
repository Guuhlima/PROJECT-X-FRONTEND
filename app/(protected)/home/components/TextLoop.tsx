'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { TracksTexts } from '../data';

export function CardTrack() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (TracksTexts.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % TracksTexts.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const active = TracksTexts[activeIndex];

    return (
        <div className="mt-8 flex min-h-36 items-center justify-center sm:mt-12 sm:min-h-40 lg:mt-16 lg:min-h-48">
            <AnimatePresence mode="wait">
                <motion.div
                    key={active.title}
                    className="mx-auto max-w-3xl text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <div className="text-foreground px-2 text-2xl font-bold sm:text-3xl">{active.title}</div>
                    <div className="text-muted-foreground mt-2 px-3 text-sm leading-6 sm:text-base">{active.description}</div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
