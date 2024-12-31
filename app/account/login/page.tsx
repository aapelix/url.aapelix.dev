import { Card, CardContent } from '@/components/ui/card'
import { login, signup } from './actions'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Card className='py-4 px-4'>
            <CardContent>
            <form className='flex flex-col gap-4'>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                <div className='flex justify-center items-center gap-4'>
                    <Button className='w-full' formAction={login}>Log in</Button>
                    <Button className='w-full' formAction={signup}>Sign up</Button>
                </div>
                <Link href="/account/resetpw">Don&acute;tcha remember yer password?</Link>
            </form>
            </CardContent>
        </Card>
    </div>
  )
}