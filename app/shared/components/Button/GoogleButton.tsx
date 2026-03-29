"use client"

import { useEffect, useState, useRef } from "react"

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (options: {
                        client_id: string;
                        callback: (response: { credential: string }) => void;
                    }) => void;
                    renderButton: (
                        element: HTMLElement,
                        options: {
                            theme: "outline" | "filled_black";
                            size: "large";
                            type: "standard";
                            text: "signin_with";
                            shape: "rectangular";
                            width: number;
                        }
                    ) => void;
                };
            };
        }
    }
}

interface GoogleProps {
    clientId: string;
    onCredential: (idToken: string) => void ;
}

export default function GoogleButton({ clientId, onCredential}: GoogleProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const onCredentialRef = useRef(onCredential);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isGoogleReady, setIsGoogleReady] = useState(false);

    useEffect(() => {
        onCredentialRef.current = onCredential;
    }, [onCredential]);

    useEffect(() => {
        const root = document.documentElement;
        const syncTheme = () => {
            setTheme(root.classList.contains("dark") ? "dark" : "light");
        };

        syncTheme();

        const observer = new MutationObserver(syncTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let tries = 0;
        let cancelled = false;

        const tick = () => {
            tries += 1
            if (cancelled) return;
            if (!window.google) {
                if (tries < 20) setTimeout(tick, 150);
                return;
            }

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: (response: { credential: string}) => {
                    onCredentialRef.current(response.credential);
                },
            });
            setIsGoogleReady(true);
        }

        tick();

        return () => {
            cancelled = true;
        };
    }, [clientId])

    useEffect(() => {
        if (!isGoogleReady || !window.google || !divRef.current) return;

        divRef.current.innerHTML = "";
        window.google.accounts.id.renderButton(divRef.current, {
            theme: theme === "dark" ? "filled_black" : "outline",
            size: "large",
            type: "standard",
            text: "signin_with",
            shape: "rectangular",
            width: 280,
        });
    }, [isGoogleReady, theme])

    return (
        <div ref={divRef} className="min-h-10" />
    )
}
