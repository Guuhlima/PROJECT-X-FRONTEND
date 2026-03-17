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
        <div className="h-72 mt-20 justify-center flex items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={active.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <div className="text-foreground font-bold text-2xl">{active.title}</div>
                    <div className="text-muted-foreground mt-2">{active.description}</div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
