"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addMessage, getTicket } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

  const params = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<{id: string, url_id: string, issue_type: string, messages: {sender: string, message: string, timestamp: string}[], status: string, created_at: string, updated_at: string, email: string, user_id: string}>();

  const [input, setInput] = useState("");

  useEffect(() => {
    const a = async () => {
        const ticket = await getTicket(params.id);
        setTicket(ticket);
    }

    a();
  }, [])


  const handleSubmit = () => {
    if (!input || !ticket) return;
    addMessage(ticket.id, ticket.email ?? "You", input);
    const newMessages = [...ticket.messages, {
        sender: ticket.email ?? "You",
        message: input,
        timestamp: new Date().toISOString()
    }];
    setTicket({ ...ticket, messages: newMessages });
    setInput("");
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex justify-center">
        <div className="md:w-1/2 w-full px-2 pt-44">
            {ticket ? (
                <>
                    <h1 className="font-bold">Ticket {ticket.id}</h1>
                
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-8 h-[60vh]">
                        <div className="w-full">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        URL ID: {ticket.url_id}
                                    </CardTitle>
                                    <CardDescription>
                                        Reported for {ticket.issue_type}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="mt-2 h-[60vh]">
                                <CardHeader>
                                    <CardTitle>Conversation</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col h-full">
                                    <div className="overflow-y-scroll flex-grow">
                                        {ticket.messages.map((message: {sender: string, message: string, timestamp: string}, index: number) => (
                                            <Card key={index} className="mt-2">
                                                <CardHeader>
                                                    <CardTitle>
                                                        {message.sender}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {new Date(message.timestamp).toLocaleString()}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    {message.message}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                    <div className="flex items-center mt-2 pb-12">
                                        <Input onKeyDown={handleKeyDown} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." className="flex-grow" />
                                        <Button 
                                            onClick={handleSubmit}
                                            className="ml-2"
                                        >
                                            <SendHorizonal />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            
                        </div>
                        <div className="w-full h-full sticky">
                            <Card className="h-full py-2">
                                <CardContent>
                                    <div className="flex flex-col h-[60vh]">
                                    <div className="flex-grow">
                                        <p className="text-zinc-400">Status:</p>
                                        <div className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${ticket.status === "open" ? "bg-green-500" : "bg-red-500"} mr-2 inline-block`}></div>
                                            <p className="font-bold">{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</p>
                                        </div>
                                        <p className="text-zinc-400">Created at:</p>
                                        <p className="font-bold">{new Date(ticket.created_at).toLocaleString()}</p>
                                        <p className="text-zinc-400">Last updated:</p>
                                        <p className="font-bold">{new Date(ticket.updated_at).toLocaleString()}</p>
                                        <p className="text-zinc-400">Issue type:</p>
                                        <p className="font-bold">{ticket.issue_type.charAt(0).toUpperCase() + ticket.issue_type.slice(1)}</p>
                                        <p className="text-zinc-400">Email:</p>
                                        <p className="font-bold">{ticket.email}</p>
                                    </div>
                                    <div className="flex gap-2 translate-y-20">
                                        <Button>Close ticket</Button>
                                    </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                        </div>
                    </div>
                </>
            ) : <p>Ticket not found</p>}
            
        </div>
    </div>
  )
}
