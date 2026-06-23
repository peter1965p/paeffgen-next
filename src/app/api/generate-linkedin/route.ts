import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content } = await req.json();

  // Hier definieren wir die Strategie für SPECTORA Content
  const prompts = {
    expert: `Schreibe einen LinkedIn Post als Senior IT System Engineer. 
             Thema: ${title}. Fokus auf 25 Jahre Erfahrung und moderne Cloud-Entwicklung. 
             Nutze eine starke Headline und Bulletpoints.`,
    system: `Schreibe einen Post, der SPECTORA als die Lösung für ${title} präsentiert. 
             Fokus auf Effizienz und Sicherheit.`,
    story: `Erzähle eine kurze Story aus der Hardware-Instandsetzung, die zu ${title} führt. 
             Motto: Vom Lötkolben zur Cloud-Sicherheit.`
  };

  // In der finalen Version würdest du hier z.B. OpenAI oder Gemini API aufrufen.
  // Hier als Platzhalter die Struktur:
  return NextResponse.json({
    posts: [
      { type: "Expertise", text: `🚀 Warum ${title} 2026 den Unterschied macht...\n\nNach 25 Jahren in der IT-Infrastruktur weiß ich: Sicherheit ist kein Produkt, sondern ein Prozess. [Mehr im Blog]` },
      { type: "System-Showcase", text: `SPECTORA Update: Wir haben die Intelligence Unit für ${title} optimiert. Hocheffizient. Sicher. Skalierbar. 🛠️` }
    ]
  });
}