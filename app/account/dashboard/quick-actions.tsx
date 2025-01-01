"use client"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function QuickActions() {
    return (
        <div>
          <p className='mt-5 text-zinc-400'>Quick actions</p>
          <div className='flex gap-2 mt-2 flex-wrap'>
            <Button onClick={() => redirect("/")} >Shorten url</Button>
            <Button onClick={() => redirect("/report/ticket/new")} >Create ticket</Button>
            <Button onClick={() => redirect("/account/logout")}>Logout</Button>
          </div>
        </div>
    )
}