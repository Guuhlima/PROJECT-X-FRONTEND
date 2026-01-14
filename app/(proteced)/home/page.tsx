// import DarkVeil from "@/components/DarkVeil";
import CardNav from "@/components/CardNav";
import logo from '../../../public/Trackify_logo.png';

export default function Page() {
  const rawItems = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
  ] as const;

  const toSlug = (s: string) =>
    s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  const items = rawItems.map((section) => ({
    ...section,
    links: section.links.map((l) => {
      if (l.label === "Twitter") {
        return {
          ...l,
          href: "https://twitter.com/seu_usuario",
          external: true,
        };
      }
      if (l.label === "LinkedIn") {
        return {
          ...l,
          href: "https://linkedin.com/in/seu_perfil",
          external: true,
        };
      }
      return {
        ...l,
        href: `/${toSlug(section.label)}/${toSlug(l.label)}`,
      };
    }),
  }));

  return (
    <div className="fixed inset-0">
      {/* <DarkVeil resolutionScale={1} /> */}
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
    </div>
  );
}
