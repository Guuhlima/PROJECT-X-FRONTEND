import CardNav from "@/app/shared/components/CardNav";
import { Profile } from "../../../shared/components/Profile";
import logo from "../../../../public/Trackify_logo.png";
import { items } from "@/app/shared/data/Items";

import ChatHome from "./components/ChatHome";
import type { Message } from "./components/ChatMessages";

const initialMessages: Message[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Ola! Posso ajudar com a rota 4521, alertas ativos ou gerar um resumo operacional. O que voce precisa agora?",
    time: "09:18",
  },
];

const suggestions = [
  "Me traga os KPIs de atraso e os alertas criticos das ultimas 2 horas.",
  "Quais rotas estao com parada nao programada agora?",
  "Gere um resumo operacional do turno com top 5 alertas.",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br text-slate-900">
      <div className="relative min-h-screen">
        <Profile name="Gustavo Lima" className="mt-3.5 h-12 w-12" />
        <CardNav
          logo={logo}
          logoAlt="Company Logo"
          items={items}
          baseColor="#ffffff"
          menuColor="#111827"
          buttonBgColor="#111827"
          buttonTextColor="#ffffff"
          ease="power3.out"
        />

        <ChatHome initialMessages={initialMessages} suggestions={suggestions} />
      </div>
    </div>
  );
}
