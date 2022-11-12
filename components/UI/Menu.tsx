import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Menu = () => {
  const { status } = useSession()
  const [open, setOpen] = useState(false)

  const line = 'w-8 h-1 bg-gray-700 transition-all rounded-md'

  if (status === 'authenticated') {
    return (
      <Link href="/dashboard">
        <div className="z-30 px-2 py-2 rounded-md shadow bg-gradient-to-t from-accent to-blue-200">
          <p>Modulos</p>
        </div>
      </Link>
    )
  } else return <></>
}

export default Menu
