import { ImapFlow } from 'imapflow';
import { NextResponse } from 'next/server';
import { simpleParser } from 'mailparser';

/**
 * AETHER OS // MAIL GATEWAY - STABLE VERSION [cite: 2026-03-08]
 * Behebt UID-Mismatch und sorgt für saubere Content-Trennung [cite: 2026-03-08]
 */

const clientConfig = {
  host: 'imaps.udag.de',
  port: 993,
  secure: true,
  auth: { user: 'paeffgen-it-de-0001', pass: 'Eifel-2026!!' },
  logger: false,
  greetingTimeout: 15000 
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  const client: any = new ImapFlow(clientConfig); // 'any' für Typ-Sicherheit bei Methoden [cite: 2026-03-08]

  try {
    await client.connect();
    // Wir nutzen immer 'INBOX' als festen Einstiegspunkt [cite: 2026-03-08]
    await client.getMailboxLock('INBOX');

    // EINZELNE MAIL LADEN [cite: 2026-03-08]
    if (uid) {
      // Wir holen exakt die Mail mit dieser UID [cite: 2026-03-08]
      const gen = client.fetch(uid, { source: true }, { uid: true });
      let rawSource = null;
      
      for await (let msg of gen) {
        rawSource = msg.source;
      }

      await client.logout();

      if (!rawSource) return NextResponse.json({ error: "MAIL_NOT_FOUND" }, { status: 404 });

      const parsed = await simpleParser(rawSource);
      return NextResponse.json({ 
        content: parsed.html || parsed.textAsHtml || parsed.text 
      });
    }

    // LISTE LADEN (FEED) [cite: 2026-03-08]
    // Wir rufen die letzten 25 Mails ab [cite: 2026-03-08]
    const list = await client.fetch('1:*', { envelope: true }, { uid: true });
    const messages = [];
    
    for await (let msg of list) {
      messages.push({
        id: msg.uid.toString(), // UID als String für API-Kompatibilität [cite: 2026-03-08]
        subject: msg.envelope.subject || '(Kein Betreff)',
        from: msg.envelope.from[0].address,
        date: msg.envelope.date
      });
    }

    await client.logout();
    
    // Neueste Mails nach oben sortieren und auf 25 begrenzen [cite: 2026-03-08]
    return NextResponse.json(messages.sort((a: any, b: any) => b.id - a.id).slice(0, 25));
    
  } catch (err: any) {
    try { await client.logout(); } catch (e) {}
    console.error("GATEWAY_SYNC_ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  const client: any = new ImapFlow(clientConfig);

  try {
    await client.connect();
    await client.getMailboxLock('INBOX');
    
    // Markieren und Löschen via UID [cite: 2026-03-08]
    await client.messageFlagsAdd({ uid: uid }, ['\\Deleted']);
    await client.mailboxClose(); 
    
    await client.logout();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    try { await client.logout(); } catch (e) {}
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}