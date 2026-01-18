import CardNav from "@/app/shared/components/CardNav";
import { Profile } from "../../shared/components/Profile";
import logo from "../../../public/Trackify_logo.png";
import { items } from "@/app/shared/data/Items";
import { CardTrack } from "./components/TextLoop";
import LogoLoop from "@/app/shared/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function Page() {
  return (
    <div className="fixed inset-0">
      <Profile name="Gustavo Lima" className="mt-3.5 w-12 h-12" />
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      <CardTrack />
      <div
        style={{ height: "200px", position: "relative", overflow: "hidden" }}
      >
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={40}
          hoverSpeed={30}
          scaleOnHover
          fadeOut
          fadeOutColor="#e5e5e5"
          ariaLabel="Technology partners"
        />
        <LogoLoop
          className="mt-5"
          logos={techLogos}
          speed={60}
          direction="right"
          logoHeight={48}
          gap={40}
          hoverSpeed={30}
          scaleOnHover
          fadeOut
          fadeOutColor="#e5e5e5"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
}
