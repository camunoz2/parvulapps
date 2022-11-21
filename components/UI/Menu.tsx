import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Menu = () => {
  const { status } = useSession()

  if (status === 'authenticated') {
    return (
      <Link href="/dashboard">
        <div className="z-30 px-2 py-2 rounded-md shadow bg-gradient-to-t from-accent to-blue-200 hover:cursor-pointer hover:shadow-xl">
          <p>Modulos</p>
        </div>
      </Link>
    )
  } else return <></>
}

export default Menu
