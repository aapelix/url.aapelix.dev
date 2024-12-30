"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "./actions";
import { redirect } from "next/navigation";

export default function LogoutPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
        <Card>
            <CardHeader>
                <CardTitle>Logout</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Are you sure you want to logout?</p>
                <div className="flex gap-2 justify-end mt-2">
                    <Button onClick={() => redirect("/")} className="bg-transparent text-white border border-[#27272a]">Cancel</Button>
                    <Button onClick={logout}>Yes</Button>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}