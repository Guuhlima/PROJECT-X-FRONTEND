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
    const [theme, setTheme] = useState<"light" | "dark">("light");

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
                theme: theme === "dark" ? "filled_black" : "outline",
                size: "large",
                type: "standard",
                text: "signin_with",
                shape: "rectangular",
                width: 280,
            });
        }

        tick();
    }, [clientId, onCredential, theme])

    return (
        <div ref={divRef} className="min-h-10" />
    )
}
