import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Menu = () => {
  const { status } = useSession()
  const [open, setOpen] = useState(false)

  const line = 'w-10 h-1 bg-gray-700 transition-all'

  if (status === 'authenticated') {
    return (
      <div onClick={() => setOpen(!open)} className="z-30">
        <div className="flex flex-col gap-1">
          <div
            className={`${line} ${
              open ? 'rotate-45 translate-y-2 bg-white' : ''
            }`}
          />
          <div
            className={`${line} ${open ? 'opacity-0 bg-white' : ''}`}
          />
          <div
            className={`${line} ${
              open ? '-rotate-45 -translate-y-2 bg-white' : ''
            }`}
          />
        </div>
        {open && (
          <div className="bg-gray-800 backdrop-blur-sm flex flex-col fixed -z-10 top-0 left-0 right-0 bottom-0 w-screen h-screen gap-4 justify-center items-center">
            <Link href="/agregar">Agregar</Link>
            <Link href="/evaluar">Evaluar</Link>
            <Link href="/configurar">Configurar</Link>
            <Link href="/dashboard">Panel</Link>
          </div>
        )}
      </div>
    )
  } else return <></>
}

export default Menu
