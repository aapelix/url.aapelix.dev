import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/account/login')
  }

  return (
    <div className='flex flex-col w-full h-screen items-center'>
      <div className='flex-col flex w-1/2 text-left pt-44'>
        <h1 className='text-zinc-400'>Dashboard</h1>
        <p className='text-6xl font-bold'>Welcome, <br /> {data.user.email}</p>
        <p className='mt-10 text-zinc-400'>coming soonTM</p>
      </div>
    </div>
  )
}