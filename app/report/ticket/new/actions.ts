"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUser() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}

export async function createTicket({ email, url_id, type, description}: { email?: string, url_id: string, type: string, description: string}) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("tickets").insert([
        {
            url_id: url_id,
            issue_type: type,
            email: email,
            status: "open",
            messages: [
                {
                    sender: email ?? "You",
                    message: description,
                    timestamp: new Date().toISOString()
                }
            ]
        }
    ]).select()

    if (error || !data) {
        console.error(error)
        return;
    }

    //redirect to ticket page
    redirect(`/report/ticket/${data[0].id}`)
}

export async function addMessage(ticketId: string, sender: string, messageContent: string) {

    const supabase = await createClient()

    const { error } = await supabase.rpc('add_message_to_ticket', {
      ticket_id: ticketId,
      new_message: {
        sender,
        message: messageContent,
        timestamp: new Date().toISOString(),
      },
    });
  
    if (error) console.error(error);
}
