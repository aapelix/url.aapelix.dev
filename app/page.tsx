"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
import { ArrowDown, Github } from "lucide-react";
import { useState } from "react";
import { redirect } from 'next/navigation';
import { CopyButton } from "@/components/copy-button";

export default function Home() {

  const { setTheme } = useTheme()
  const [input, setInput] = useState("")
  const [id, setId] = useState("")

  setTheme("dark")

  const upload = async () => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: 'https://aapelix.dev' }),
    });
    
    const data = await response.json();
    if (data.url_id) {
      console.log('Generated URL ID:', data.url_id);
      setId(data.url_id)
    } else {
      console.log('Error:', data.error);
    }
    
  }


  return (
    <main className="font-mono flex flex-col items-center w-screen justify-center pb-24">
      <div className="flex items-center flex-col mb-7">
      <header className="w-1/2 h-[94vh] flex justify-center items-center flex-col gap-3 relative">
        <h1 className="font-black text-7xl text-center">The easiest way to shorten your urls</h1>
        <div className="flex gap-x-2 mt-5">
          <Input onChange={(e) => setInput(e.target.value)} className="w-96" type="url" placeholder="https://example.com/" />
          <Button onClick={() => upload()}>Shorten!</Button>
        </div>
        {id && (
          <div>
            <div className='bg-zinc-800 rounded-xl py-2 px-2 flex gap-2 justify-between'><p>https://aapelix.link/{id}</p> <CopyButton text={"https://aapelix.link/" + id} /></div>
          </div>
        )}
        
      </header>
      <p>Read more</p>
      <ArrowDown />
      </div>
      <section className="flex flex-col items-center py-10">
  <h1 className="text-6xl text-center font-extrabold mb-10">Pricing</h1>
  <div className="flex flex-wrap justify-center gap-6">
    <Card className="w-full max-w-md p-6 shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-semibold text-center mb-2">
          Well, actually... it&apos;s completely free! 🎉
        </CardTitle>
        <CardDescription className="text-zinc-400 text-center">
          Here&apos;s what you get:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-zinc-100">
          <li className="flex items-center">
            <span className="mr-2">✅</span> Infinite URLs
          </li>
          <li className="flex items-center">
            <span className="mr-2">⏳</span> URLs will be deleted if unused for 3 months
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card className="w-full max-w-md p-6 shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-semibold text-center mb-2">
          Donations are always appreciated! ❤️
        </CardTitle>
        <CardDescription className="text-zinc-400 text-center">
          Supporting keeps this service running!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-5 text-zinc-100">
          <li className="flex items-center">
            <span className="mr-2">🌟</span> This service will remain free and open source forever
          </li>
          <li className="flex items-center">
            <a className="w-full" href="https://buymeacoffee.com/aapelix" target="_blank" rel="noopener noreferrer"><Button className="w-full">Support</Button></a>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</section>
    <footer>
      <a className="flex gap-2 bg-white rounded-full text-black py-2 px-4 hover:w-96 items-center justify-center duration-300 w-44" href="https://github.com/aapelix/url.aapelix.dev" target="_blank"><Github /> Github</a>
    </footer>
    </main>
  );
}
