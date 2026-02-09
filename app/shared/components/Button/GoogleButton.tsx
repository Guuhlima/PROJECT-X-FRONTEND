"use client"

import { useEffect, useRef } from "react"

declare global {
    interface Window {
        google?: any
    }
}

interface GoogleProps {
    clientId: string;
    onCredential: (idToken: string) => void ;
}

export default function GoogleButton({ clientId, onCredential}: GoogleProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let tries = 0;
        const tick = () => {
            tries += 1
            if (!window.google || !divRef.current) {
                if (tries < 20) setTimeout(tick, 150);
                return;
            }
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: (response: { credential: string}) => {
                    onCredential(response.credential);
                },
            });

            window.google.accounts.id.renderButton(divRef.current, {
                theme: "outline",
                size: "large",
                type: "standard",
                text: "signin_with",
                shape: "rectangular",
            });
        }

        tick();
    }, [clientId, onCredential])

    return (
        <div ref={divRef} />
    )
}