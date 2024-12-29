import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id)

  const supabase = await createClient();

  const { data, error } = await supabase.from('url').select('url').eq('url_id', id).single();

  if (error) {
    return (
      <div className='font-mono flex w-screen h-screen items-center justify-center text-center'>
        <p className='text-6xl font-bold'>ID not found</p>
      </div>
    );
  }

  if (!data || !data.url) {
    return (
      <div className='font-mono flex w-screen h-screen items-center justify-center text-center'>
        <p className='text-6xl font-bold'>ID was found but no URL</p>
        <p>{id}</p>
      </div>
    )
  }

  

  redirect(data.url.startsWith("https://") ? data.url : "https://" + data.url);

  return null;
}
