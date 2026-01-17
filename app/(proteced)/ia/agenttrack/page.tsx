import CardNav from "@/app/shared/components/CardNav";
import { Profile } from "../../../shared/components/Profile";
import logo from "../../../../public/Trackify_logo.png";
import { items } from "@/app/shared/data/Items";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import type { Message } from "./components/ChatMessages";

const messages: Message[] = [
  {
    id: "m1",
    role: "assistant",
    text:
      "Ola! Posso ajudar com a rota 4521, alertas ativos ou gerar um resumo operacional. O que voce precisa agora?",
    time: "09:18",
  },
  {
    id: "m2",
    role: "user",
    text: "Me traga os KPIs de atraso e os alertas criticos das ultimas 2 horas.",
    time: "09:19",
  },
  {
    id: "m3",
    role: "assistant",
    text:
      "Resumo rapido: atraso medio caiu 12% nas ultimas 2h. Temos 3 alertas criticos (duas rotas com parada nao programada e uma com risco de chuva forte). Quer detalhes por rota?",
    time: "09:20",
  },
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

        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-32">
          <section className="flex min-h-[78vh] flex-col gap-6 rounded-[32px] border p-6 shadow-sm">
            <ChatHeader />
            <ChatMessages messages={messages} />
            <ChatInput />
          </section>
        </div>
      </div>
    </div>
  );
}
