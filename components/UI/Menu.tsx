import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Menu = () => {
  const { status } = useSession()

  if (status === 'authenticated') {
    return (
      <Link href="/dashboard">
        <div className="z-10 py-3 px-4 rounded-md bg-accent hover:cursor-pointer hover:shadow-md">
          <p>Modulos</p>
        </div>
      </Link>
    )
  } else return <></>
}

export default Menu
