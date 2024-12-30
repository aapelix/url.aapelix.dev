import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import Image from "next/image";
import { getSignedIn } from "@/app/actions";

export default async function NavBar() {

    const isSignedIn = getSignedIn()

    return (
        <nav className="text-zinc-100 w-screen p-4 flex justify-between items-center fixed bg-gradient-to-b from-[#09090b] to-[#09090b00] z-50">
            <a href="/">
                <div className="flex gap-2">
                    <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
                    <p className="font-bold text-xl">aapelix.link</p>
                </div>
            </a>
            <div className="flex gap-4 absolute left-1/2 -translate-x-1/2">
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
            <div className="flex gap-4 absolute right-4">
                {await isSignedIn ? (
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
                        </Link><Link className="hover:bg-zinc-900 px-2 py-2 rounded-md duration-300 font-bold" href="/account/login">
                                <p>Login</p>
                        </Link>
                    </>
                )}

                
            </div>
        </nav>
    )
}