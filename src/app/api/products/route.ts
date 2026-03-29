import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Das ist die "Geheimwaffe", damit Vercel beim Build nicht meckert
export const dynamic = 'force-dynamic';

// Wir erstellen den Client in einer kleinen Hilfsfunktion, damit er erst 
// aufgerufen wird, wenn wirklich eine Anfrage (GET/POST) reinkommt.
const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase URL oder Key fehlen in den Umgebungsvariablen!');
  }

  return createClient(url, key);
};

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}