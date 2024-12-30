'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
  }

  const { error } =  await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: 'https://aapelix.link/account/changepw',
  })

  if (error) {
    redirect('/error')
  }
  
}