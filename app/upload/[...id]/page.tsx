import { createClient } from '@/utils/supabase/server';

type Entry = {
  id: number;
  created_at: string;
  url_id: string;
  redirect_url: string;
};

function getRedirectUrl(data: Entry[], urlId: string): string | undefined {
  const entry = data.find(item => item.url_id === urlId);
  return entry?.redirect_url;
}

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function joinWithSlash(parts: string[]): string {
    return parts.join('/');
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const url = (await params).id;
    const supabase = await createClient();

    const randomStr = generateRandomString(6)

    const { data: countries } = await supabase.from("url").select();

    const redirectUrl = getRedirectUrl(countries || [], randomStr);

    const joinedUrl = joinWithSlash(url as unknown as string[])

    if (!redirectUrl) {

      const { error: error } = await supabase.from("url").insert({ url_id: randomStr, redirect_url: joinedUrl})

      if (error) console.error(error)
    }
}
