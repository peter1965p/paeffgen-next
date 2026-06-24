export type BlockType = "hero" | "text" | "stats" | "terminal" | "cards" | "cta";

export interface HeroBlock {
  type: "hero";
  id: string;
  badge?: string;
  headline: string;
  subline?: string;
  description?: string;
  primaryBtn?: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
}

export interface TextBlock {
  type: "text";
  id: string;
  label?: string;
  heading: string;
  body: string;
}

export interface StatItem {
  value: string;
  unit?: string;
  sublabel: string;
}

export interface StatsBlock {
  type: "stats";
  id: string;
  items: StatItem[];
}

export interface TerminalBlock {
  type: "terminal";
  id: string;
  title?: string;
  lines: string[];
}

export interface CardItem {
  title: string;
  text: string;
}

export interface CardsBlock {
  type: "cards";
  id: string;
  label?: string;
  heading?: string;
  items: CardItem[];
}

export interface CtaBlock {
  type: "cta";
  id: string;
  label?: string;
  heading: string;
  body?: string;
  btn: { label: string; href: string };
  variant?: "red" | "blue";
}

export type Block = HeroBlock | TextBlock | StatsBlock | TerminalBlock | CardsBlock | CtaBlock;

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero — Großer Titel",
  text: "Text — Heading + Absatz",
  stats: "Stats — Zahlen-Grid",
  terminal: "Terminal — Kernel Output",
  cards: "Cards — Feature Grid",
  cta: "CTA — Call to Action",
};

export function createBlock(type: BlockType): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "hero":
      return { type, id, headline: "Neue Seite", subline: "", description: "", badge: "", primaryBtn: { label: "Mehr erfahren", href: "#" }, secondaryBtn: { label: "Kontakt", href: "/contact" } };
    case "text":
      return { type, id, label: "Abschnitt", heading: "Überschrift", body: "Dein Text hier..." };
    case "stats":
      return { type, id, items: [{ value: "1+", unit: "", sublabel: "LABEL" }, { value: "100%", unit: "", sublabel: "LABEL" }] };
    case "terminal":
      return { type, id, title: "KERNEL_OUTPUT", lines: ["Initialisiere...", "System bereit."] };
    case "cards":
      return { type, id, label: "Features", heading: "Was wir bieten", items: [{ title: "Feature 1", text: "Beschreibung..." }, { title: "Feature 2", text: "Beschreibung..." }] };
    case "cta":
      return { type, id, label: "Kontakt", heading: "Lass uns reden.", body: "", btn: { label: "Jetzt anfragen →", href: "/contact" }, variant: "blue" };
  }
}
