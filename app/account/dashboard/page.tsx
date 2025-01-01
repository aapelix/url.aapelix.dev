import { CopyButton } from '@/components/copy-button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { redirect } from 'next/navigation'
import { DeleteButton } from '@/components/delete-button'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import QuickActions from './quick-actions'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/account/login')
  }

  const { data: url_data, error: url_error } = await supabase
    .from('url')
    .select('*')
    .eq('user_id', data.user.id)

  if (url_error) {
    console.error('Error fetching URLs:', url_error)
  } else {
    console.log('User URLs:', url_data)
  }

  return (
    <div className='flex flex-col w-full h-screen items-center'>
      <div className='flex-col flex md:w-1/2 w-full px-2 text-left pt-44'>
        <h1 className='text-zinc-400'>Dashboard</h1>
        <p className='md:text-6xl text-4xl font-bold'>Welcome, <br /> {data.user.email}</p>
        <QuickActions />
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Your URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short URL</TableHead>
                  <TableHead>Redirect URL</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>ID (in DB)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              {url_data && url_data.length > 0 && (
                <TableBody>
                  {url_data.map((url: any) => (
                    <TableRow key={url.url_id}>
                      <TableCell>
                        <div className='flex gap-2'>
                          <p>{url.url_id}</p>
                          <CopyButton size="15" text={url.url_id} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <p>{url.url}</p>
                          <CopyButton size="15" text={url.url} />
                        </div>
                      </TableCell>
                      <TableCell>{new Date(url.created_at).toLocaleString()}</TableCell>
                      <TableCell>{url.id}</TableCell>
                      <TableCell>
                        <DeleteButton urlId={url.url_id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
