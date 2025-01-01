"use server"

import { createClient } from "@/utils/supabase/server"

export async function getTicket(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("tickets").select().eq("id", id)

    if (error) {
        console.error(error)
        return
    }

    return data[0]
}