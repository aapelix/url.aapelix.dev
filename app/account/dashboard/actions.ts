"use server"

import { createClient } from "@/utils/supabase/server"

export async function deleteUrl(url_id: string) {
    const supabase = await createClient()
    
    const response = await supabase.from("url").delete().eq("url_id", url_id)
    
    console.log(response)
}