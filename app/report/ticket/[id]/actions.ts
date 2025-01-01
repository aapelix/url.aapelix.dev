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

export async function addMessage(ticketId: string, sender: string, messageContent: string) {

    const supabase = await createClient()
    
    const { data: ticket, error: fetchError } = await supabase
    .from('tickets')
    .select('messages')
    .eq('id', ticketId)
    .single();

  if (fetchError) {
    console.error('Error fetching ticket:', fetchError);
    return;
  }

  const newMessage = {
    sender: sender,
    timestamp: new Date().toISOString(),
    message: messageContent,
  };

  const updatedMessages = ticket?.messages ? [...ticket.messages, newMessage] : [newMessage];

  const { error: updateError } = await supabase
    .from('tickets')
    .update({ messages: updatedMessages })
    .eq('id', ticketId)

  if (updateError) {
    console.error('Error updating messages:', updateError);
  }

}