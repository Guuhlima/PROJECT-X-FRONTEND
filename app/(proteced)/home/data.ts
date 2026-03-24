export const TracksTexts = [
  {
    title: "Central de Operacoes do Armazem",
    description:
      "Acompanhe a saude dos estoques, movimentacoes e prioridades do dia em uma unica tela.",
  },
  {
    title: "Visao Gerencial em Tempo Real",
    description:
      "Alterne entre indicadores executivos e noticias operacionais para agir mais rapido.",
  },
  {
    title: "Decisoes Mais Rapidas",
    description:
      "Veja produtos com maior giro, promocoes monitoradas e alertas relevantes para o negocio.",
  },
];

export type HomeViewMode = "dashboard" | "newsroom";

export type NewsHighlight = {
  title: string;
  value: string;
  change: string;
  tone: "positive" | "negative" | "neutral";
};

export type WarehouseNewsItem = {
  category: string;
  title: string;
  summary: string;
  time: string;
  tone: "sky" | "amber" | "emerald" | "rose";
};

export type StockMovementItem = {
  product: string;
  sku: string;
  inbound: number;
  outbound: number;
  balance: string;
  status: "Alta procura" | "Reposicao critica" | "Estavel";
};

export type PromotionWatchItem = {
  store: string;
  campaign: string;
  focus: string;
  window: string;
  impact: string;
};

export const newsroomHighlights: NewsHighlight[] = [
  {
    title: "Movimentacoes hoje",
    value: "2.480",
    change: "+12% vs ontem",
    tone: "positive",
  },
  {
    title: "Rupturas previstas",
    value: "8 SKUs",
    change: "3 exigem acao imediata",
    tone: "negative",
  },
  {
    title: "Promocoes monitoradas",
    value: "14",
    change: "5 com impacto alto",
    tone: "neutral",
  },
];

export const warehouseNews: WarehouseNewsItem[] = [
  {
    category: "Armazem",
    title: "Recebimento acima da media no CD Norte",
    summary:
      "O volume de entrada de eletronicos subiu 18% desde ontem, puxado por reposicoes de notebooks e monitores.",
    time: "Atualizado ha 15 min",
    tone: "sky",
  },
  {
    category: "Estoque",
    title: "SKU P-204 entrou em faixa de reposicao critica",
    summary:
      "A saida nas ultimas 24h ficou 31% acima da media e o saldo projetado cobre apenas mais 2 dias.",
    time: "Atualizado ha 32 min",
    tone: "rose",
  },
  {
    category: "Movimentacao",
    title: "Pico de separacao concentrado entre 14h e 16h",
    summary:
      "A operacao de picking ganhou velocidade na faixa da tarde, com destaque para itens promocionais de alto giro.",
    time: "Atualizado ha 48 min",
    tone: "emerald",
  },
  {
    category: "Mercado",
    title: "Campanhas externas pressionam a saida de utilidades domesticas",
    summary:
      "Monitoramento de marketplace detectou novas ofertas competitivas, indicando aumento de demanda em 4 categorias.",
    time: "Atualizado ha 1 h",
    tone: "amber",
  },
];

export const stockMovements: StockMovementItem[] = [
  {
    product: "Notebook Vision 14",
    sku: "NB-4412",
    inbound: 340,
    outbound: 418,
    balance: "-78 un",
    status: "Alta procura",
  },
  {
    product: "Mouse Pro Wireless",
    sku: "MS-9081",
    inbound: 210,
    outbound: 205,
    balance: "+5 un",
    status: "Estavel",
  },
  {
    product: "Monitor UltraWide 29",
    sku: "MN-2904",
    inbound: 160,
    outbound: 244,
    balance: "-84 un",
    status: "Reposicao critica",
  },
  {
    product: "Headset Studio X",
    sku: "HS-7780",
    inbound: 280,
    outbound: 198,
    balance: "+82 un",
    status: "Estavel",
  },
];

export const promotionWatch: PromotionWatchItem[] = [
  {
    store: "Marketplace Prime",
    campaign: "Semana do Frete Gratis",
    focus: "Acessorios e perifericos",
    window: "24 a 28 mar",
    impact: "Alta chance de acelerar saidas no estoque Sul",
  },
  {
    store: "Loja TechMais",
    campaign: "Festival Home Office",
    focus: "Monitores e cadeiras",
    window: "25 a 31 mar",
    impact: "Sugere reforco de reposicao para itens premium",
  },
  {
    store: "Shop Agora",
    campaign: "Oferta relampago noturna",
    focus: "Cabos, hubs e conectividade",
    window: "Todos os dias, 20h as 23h",
    impact: "Tende a gerar picos curtos de separacao no periodo noturno",
  },
];
