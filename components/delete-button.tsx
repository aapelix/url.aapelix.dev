'use client'

import { deleteUrl } from '@/app/account/dashboard/actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


export function DeleteButton({urlId}: {urlId: string}) {

  const router = useRouter();

  return (
    <Button
      className='bg-red-500 hover:bg-red-900 w-full'
      onClick={() => {
        deleteUrl(urlId).then(
            router.refresh
        )
    }}
    >
      <Trash2 />
    </Button>
  )
}
