import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const randomStr = generateRandomString(6);
    const supabase = await createClient();

    const { data: countries, error: selectError } = await supabase.from("url").select().eq('url_id', randomStr);

    if (selectError) {
      return NextResponse.json({ error: 'Error checking existing URL' }, { status: 500 });
    }

    if (countries?.length > 0) {
      return NextResponse.json({ error: 'URL already exists' }, { status: 400 });
    }

    const { data, error: insertError } = await supabase.from("url").insert([{ url, url_id: randomStr }]).select();

    if (insertError) {
      return NextResponse.json({ error: 'Error inserting URL' }, { status: 500 });
    }

    return NextResponse.json({ url_id: randomStr }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}
