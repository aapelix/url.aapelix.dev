"use server";

import { createClient } from "@/utils/supabase/server";

export async function getSignedIn() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return false
    } else if (user) {
        return true
    }
}