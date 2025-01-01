"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createTicket, getUser } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Page() {

    const params = useSearchParams();

    const [user, setUser] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [urlId, setUrlId] = useState("");
    const [description, setDescription] = useState("");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const a = async () => {
            const userData = await getUser();
            console.log(userData);
            setUser(userData?.email ?? null);
        }

        a();

        const url_id = params.get("url_id");
        setUrlId(url_id ?? "");
    }, [])

    const handleSubmit = () => {
        if (!urlId || !selected) return;
        createTicket({ email: user ?? undefined, url_id: urlId, type: selected ?? "", description, connected });
    }

    return (
        <div className="flex justify-center w-screen h-screen">
            <div className="md:w-1/2 pt-56 w-full px-2">
                <h1 className="font-bold md:text-6xl text-4xl">Create a new ticket</h1>
                <Card className="mt-5">
                    <CardContent>
                        <div className="pb-5 pt-5 flex flex-col gap-3">
                            <Label htmlFor="email">Your email (optional)</Label>
                            <Input id="email" name="email" type="email" placeholder="hello@aapelix.dev" value={user ?? ""} onChange={(e) => setUser(e.target.value)} />
                            <div className="flex items-center gap-2">
                                <Switch id="connected" checked={connected} onCheckedChange={setConnected} />
                                <Label htmlFor="connected">Connect this ticket to my account I'm signed in with (recommended)</Label>
                            </div>
                            <Label htmlFor="url_id">URL ID</Label>
                            <Input id="url_id" name="url_id" type="text" placeholder="abc123" onChange={(e) => setUrlId(e.target.value)} value={urlId} />
                            <Label htmlFor="">What is wrong with the URL?</Label>
                            <Select onValueChange={setSelected}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="malware">Malware</SelectItem>
                                        <SelectItem value="phishing">Phishing</SelectItem>
                                        <SelectItem value="spam">Spam</SelectItem>
                                        <SelectItem value="harassment">Harassment</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="description">Description</Label>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" placeholder="If you have more to say about this report, you can write it here" />
                            <Button onClick={handleSubmit}>Submit</Button>
                        </div>
                    </CardContent>
                </Card>
                
            </div>
        </div>
    )
}