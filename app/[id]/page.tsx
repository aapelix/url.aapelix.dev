import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  const supabase = await createClient();
  const { data: countries } = await supabase.from("url").select();

  const redirectUrl = getRedirectUrl(countries || [], slug);

  if (redirectUrl) {
    redirect("https://" + redirectUrl);

    return (
        <h1 className="text-6xl text-center font-bold font-mono">Redirecting you</h1>
    )
  } else {
    // Handle the case where the redirect URL is not found
    return (
      <div className='font-mono flex w-screen h-screen items-center justify-center'>
        <p className='text-6xl font-bold'>URL not found</p>
      </div>
    );
  }
}
