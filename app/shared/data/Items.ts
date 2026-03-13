export const rawItems = [
    {
      label: "IA",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "AgentTrack", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Transfer",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Receipt", ariaLabel: "Featured Projects" },
        { label: "Scheduling", ariaLabel: "Project Case Studies" },
      ],
    },
    {
      label: "Warehouse",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Stocks", ariaLabel: "Email us" },
        { label: "Location", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" },
      ],
    },
] as const;

const toSlug = (s: string) =>
    s.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

export const items = rawItems.map((section) => ({
    ...section,
    links: section.links.map((l) => {
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