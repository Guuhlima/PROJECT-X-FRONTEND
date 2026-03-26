import type { ReactNode } from "react";
import CardNav from "@/app/shared/components/Card/CardNav";
import logo from "@/public/Trackify_logo.png";
import { items } from "@/app/shared/data/Items";
import { Profile } from "../shared/components/Profile";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Profile name="Gustavo Lima" className="h-12 w-12" />
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
