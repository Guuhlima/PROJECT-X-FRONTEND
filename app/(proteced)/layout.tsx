import type { ReactNode } from "react";
import CardNav from "@/app/shared/components/CardNav";
import logo from "@/public/Trackify_logo.png";
import { items } from "@/app/shared/data/Items";
import { Profile } from "../shared/components/Profile";
import ThemeMode from "../shared/components/ThemeMode";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeMode />
      <Profile name="Gustavo Lima" className="mt-3.5 h-12 w-12" />
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="var(--card)"
        menuColor="var(--foreground)"
        buttonBgColor="var(--primary)"
        buttonTextColor="var(--primary-foreground)"
        ease="power3.out"
      />
      {children}
    </>
  );
}
