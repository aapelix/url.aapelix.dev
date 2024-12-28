{/* <div className='font-mono flex w-screen h-screen items-center justify-center'>
        <h1 className="text-6xl text-center font-bold font-mono">Redirecting you to {redirectUrl}</h1>
      </div>

<div className='font-mono flex w-screen h-screen items-center justify-center'>
        <p className='text-6xl font-bold'>URL not found</p>
      </div> */}

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function RedirectPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log(id)

  const supabase = await createClient();

  const { data, error } = await supabase.from('url').select('url').eq('url_id', id).single();

  if (error) {
    return (
      <div className='font-mono flex w-screen h-screen items-center justify-center'>
        <p className='text-6xl font-bold'>URL not found</p>
      </div>
    );
  }

  if (!data || !data.url) {
    return (
      <div className='font-mono flex w-screen h-screen items-center justify-center'>
        <p className='text-6xl font-bold'>URL not found for ID</p>
      </div>
    )
  }

  

  redirect(data.url.startsWith("https://") ? data.url : "https://" + data.url);

  return null;
}
