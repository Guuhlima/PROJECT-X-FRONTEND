'use client';

import { useEffect, useRef, useState } from 'react';

type ProfileMenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type ProfileProps = {
  name?: string;
  avatarUrl?: string;
  className?: string;
  items?: ProfileMenuItem[];
};

const defaultItems: ProfileMenuItem[] = [
  { label: 'Settings', href: '/configuracoes' },
  { label: 'Leave' },
];

export function Profile({ name = 'Usuario', avatarUrl, className = '', items = defaultItems }: ProfileProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (event.target instanceof Node && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div ref={containerRef} className={`fixed top-6 right-6 z-[120] ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-card/70 text-sm font-semibold text-foreground shadow-md transition hover:scale-[1.02]"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={`Avatar de ${name}`} className="h-full w-full object-cover" />
        ) : (
          <span className="select-none">{initials || 'U'}</span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        >
          <div className="px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">{name}</div>
          <div className="border-t border-border">
            {items.map((item) => {
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    role="menuitem"
                    href={item.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  onClick={item.onClick}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
