"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getSignedIn() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/")
    } else if (user) {
        return true
    }
}

export async function changePassword(formData: FormData) {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const data = {
    new_password: formData.get('new-password') as string,
  }


  if (user) {
    const { error } = await supabase.auth.updateUser({
        password: data.new_password,
    })

    if (error) {
        redirect('/error')
    } else {
        redirect("/login")
    }
  }
  
}