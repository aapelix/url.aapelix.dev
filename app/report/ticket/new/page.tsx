"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createTicket, getUser } from "./actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Shield, SendHorizontal } from "lucide-react";

const FloatingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="fixed w-6 h-6 rounded-full bg-white/5 pointer-events-none blur-sm"
      animate={{ 
        x: position.x - 12,
        y: position.y - 12,
      }}
      transition={{ type: "spring", damping: 30 }}
    />
  );
};

import { ReactNode } from "react";

const FormField = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 20 }}
    className="space-y-2"
  >
    {children}
  </motion.div>
);

function TicketForm() {
    const params = useSearchParams();
    const [user, setUser] = useState<string | null>(null);
    const [selected, setSelected] = useState<string>("");
    const [urlId, setUrlId] = useState("");
    const [description, setDescription] = useState("");
    const [connected, setConnected] = useState(true);

    useEffect(() => {
        const a = async () => {
            const userData = await getUser();
            setUser(userData?.email ?? null);
        }

        a();

        const url_id = params.get("url_id");
        setUrlId(url_id ?? "");
    }, []);

    const handleSubmit = () => {
        if (!urlId || !selected) return;
        createTicket({ email: user ?? undefined, url_id: urlId, type: selected ?? "", description });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
            <FloatingCursor />
            
            <motion.div 
                className="absolute inset-0 bg-grid-white/[0.02]"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative flex justify-center w-full min-h-screen">
                <div className="md:w-1/2 pt-24 w-full px-4 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <Shield className="w-12 h-12 text-white/80" />
                        <h1 className="font-bold md:text-5xl text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Report an Issue
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="border border-white/10 bg-zinc-900/50 backdrop-blur-xl">
                            <CardContent>
                                <div className="py-6 space-y-6">
                                    <FormField>
                                        <Label htmlFor="email" className="text-white/80">Your email (optional)</Label>
                                        <Input 
                                            id="email" 
                                            name="email" 
                                            type="email" 
                                            placeholder="hello@aapelix.dev" 
                                            value={user ?? ""} 
                                            onChange={(e) => setUser(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700 focus:ring-white/20"
                                        />
                                    </FormField>

                                    <FormField>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50">
                                            <Switch 
                                                id="connected" 
                                                checked={connected} 
                                                onCheckedChange={setConnected}
                                            />
                                            <Label htmlFor="connected" className="text-sm text-white/80">
                                                Connect this ticket to my account (recommended)
                                            </Label>
                                        </div>
                                    </FormField>

                                    <FormField>
                                        <Label htmlFor="url_id" className="text-white/80">URL ID</Label>
                                        <Input 
                                            id="url_id" 
                                            name="url_id" 
                                            type="text" 
                                            placeholder="abc123" 
                                            onChange={(e) => setUrlId(e.target.value)} 
                                            value={urlId}
                                            className="bg-zinc-800 border-zinc-700 focus:ring-white/20"
                                        />
                                    </FormField>

                                    <FormField>
                                        <Label className="text-white/80">What is wrong with the URL?</Label>
                                        <Select onValueChange={setSelected}>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue placeholder="Choose an option" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectGroup>
                                                    <SelectItem value="malware">Malware</SelectItem>
                                                    <SelectItem value="phishing">Phishing</SelectItem>
                                                    <SelectItem value="spam">Spam</SelectItem>
                                                    <SelectItem value="harassment">Harassment</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormField>

                                    <FormField>
                                        <Label htmlFor="description" className="text-white/80">Description</Label>
                                        <Textarea 
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)} 
                                            id="description" 
                                            name="description" 
                                            placeholder="If you have more to say about this report, you can write it here"
                                            className="bg-zinc-800 border-zinc-700 focus:ring-white/20 min-h-[120px]"
                                        />
                                    </FormField>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button 
                                            onClick={handleSubmit}
                                            className="w-full bg-white text-black hover:bg-white/90 transition-colors"
                                        >
                                            <motion.div
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <SendHorizontal className="w-4 h-4" />
                                                Submit Report
                                            </motion.div>
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                        className="flex items-center gap-2 text-sm text-white/60 bg-zinc-800/50 p-3 rounded-lg"
                                    >
                                        <AlertCircle className="w-4 h-4" />
                                        <p>Your report will be reviewed by our team within 24 hours</p>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .bg-grid-white {
                    background-size: 40px 40px;
                    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                }
            `}</style>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black text-white/80">
                Loading...
            </div>
        }>
            <TicketForm />
        </Suspense>
    );
}