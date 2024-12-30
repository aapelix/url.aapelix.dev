"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSignedIn } from "@/app/actions";

export async function getServerSideProps() {
    const isSignedIn = await getSignedIn();
    return { props: { isSignedIn } };
}

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="text-zinc-100 w-screen p-4 flex justify-between items-center fixed bg-[#09090b]/80 backdrop-blur-md md:backdrop-blur-none md:bg-transparent md:bg-gradient-to-b from-[#09090b] to-[#09090b00] z-50">
            <Link href="/">
                <div className="flex gap-2">
                    <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                    <p className="font-bold text-xl">aapelix.link</p>
                </div>
            </Link>
            <div className="md:flex gap-4 absolute left-1/2 -translate-x-1/2 hidden">
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/">
                    <p>Shorten!</p>
                </Link>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/tos">
                    <p>Terms Of Service</p>
                </Link>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/report">
                    <p>Report</p>
                </Link>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/support">
                    <p>Support</p>
                </Link>
            </div>
            <div className="md:flex gap-4 absolute right-4 hidden">
                {isSignedIn ? (
                    <>
                        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/dashboard">
                            <p>Dashboard</p>
                        </Link>
                        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/logout">
                            <p>Logout</p>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/login">
                            <p>Sign up</p>
                        </Link>
                        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300 font-bold" href="/account/login">
                            <p>Login</p>
                        </Link>
                    </>
                )}
            </div>
            <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isOpen && (
    <div className="md:hidden absolute top-16 left-0 w-full bg-[#09090b]/80 backdrop-blur-md flex flex-col items-center gap-4 p-4 h-screen pt-24">
        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/">
            <p>Shorten!</p>
        </Link>
        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/tos">
            <p>Terms Of Service</p>
        </Link>
        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/report">
            <p>Report</p>
        </Link>
        <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/support">
            <p>Support</p>
        </Link>
        {isSignedIn ? (
            <>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/dashboard">
                    <p>Dashboard</p>
                </Link>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/logout">
                    <p>Logout</p>
                </Link>
            </>
        ) : (
            <>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300" href="/account/login">
                    <p>Sign up</p>
                </Link>
                <Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300 font-bold" href="/account/login">
                    <p>Login</p>
                </Link>
            </>
        )}
    </div>
)}

        </nav>
    );
}