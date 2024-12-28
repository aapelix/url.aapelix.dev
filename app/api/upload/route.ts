import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const urlId = url.searchParams.get('url_id');

    if (!urlId) {
      return NextResponse.json({ error: 'url_id is required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.from("url").select('url').eq('url_id', urlId).single();

    if (error) {
      return NextResponse.json({ error: 'Error fetching URL' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    return NextResponse.json({ url: data.url }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error: ' + error }, { status: 500 });
  }
}
