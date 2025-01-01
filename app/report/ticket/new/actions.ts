"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return user
}

export async function createTicket({ email, url_id, type, description, connected}: { email?: string, url_id: string, type: string, description: string, connected: boolean }) {
    const supabase = await createClient()

    connected ? console.log("connected") : console.log("not connected")

    const { data, error } = await supabase.from("tickets").insert([
        {
            url_id: url_id,
            issue_type: type,
            email: email,
            status: "open",
            messages: [
                {
                    sender: "system",
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

    console.log(data[0].id)

    //redirect to ticket page
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
