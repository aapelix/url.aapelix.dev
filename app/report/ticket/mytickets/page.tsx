import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function Page() {

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/account/login')
    }

    const { data: dataT, error: errorT } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', data.user.id)

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:w-1/2 pt-44">
                <h1 className="md:text-6xl text-4xl font-bold">My tickets</h1>
                
                {dataT && dataT.length > 0 ? (
                    <>
                        {dataT.map((ticket: {id: string, url_id: string, issue_type: string, status: string, created_at: string, updated_at: string}) => (
                            <Suspense key={ticket.id} fallback={<p>Loading...</p>}>
                                <Link href="/report/ticket/[id]" as={`/report/ticket/${ticket.id}`}>
                                <Card className="mt-5 pt-4 hover:scale-105 duration-300">
                                    <CardContent>
                                        <h2 className="font-bold text-xl">{ticket.id}</h2>

                                        <div className="flex gap-4 mt-2">
                                        <div>
                                            <p className="text-zinc-400">Status:</p>
                                            <div className="flex items-center">
                                                <div className={`w-3 h-3 rounded-full ${ticket.status === "open" ? "bg-green-500" : "bg-red-500"} mr-2 inline-block`}></div>
                                                <p className="font-bold text-zinc-400">{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</p>
                                            </div>
                                        </div>  
                                        <div>
                                            <p className="text-zinc-400">Created at:</p>
                                            <p className="font-bold text-zinc-400">{new Date(ticket.created_at).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-zinc-400">Last updated:</p>
                                            <p className="font-bold text-zinc-400">{new Date(ticket.updated_at).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-zinc-400">Issue type:</p>
                                            <p className="font-bold text-zinc-400">{ticket.issue_type.charAt(0).toUpperCase() + ticket.issue_type.slice(1)}</p>
                                        </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            </Suspense>
                        ))}
                    </>
                ) : (
                    <p>You don't have any tickets yet.</p>
                )}
            </div>
        </div>
    )
}