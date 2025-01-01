import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTicket } from "./actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);

  return (
    <div className="flex justify-center">
        <div className="md:w-1/2 w-full px-2 pt-56">
            {ticket ? (
                <>
                    <h1 className="font-bold">Ticket {id}</h1>
                
                    <div className="grid grid-cols-2 gap-2">
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
                        <div className="w-full sticky h-[60vh]">
                            <Card>
                                <CardContent>
                                    <p>Status: {ticket.status}</p>
                                    <p>Created at: {new Date(ticket.created_at).toLocaleString()}</p>
                                    <p>Last updated: {new Date(ticket.updated_at).toLocaleString()}</p>
                                    <p>Issue type: {ticket.issue_type}</p>
                                    <p>Email: {ticket.email}</p>
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
