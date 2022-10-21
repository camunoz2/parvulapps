import { useState } from 'react'
import { useSession } from 'next-auth/react'

const Menu = () => {
  const { status } = useSession()
  const [open, setOpen] = useState(false)

  const line = 'w-10 h-1 bg-gray-700 transition-all'

  if (status === 'authenticated') {
    return (
      <div
        onClick={() => setOpen(!open)}
        className="absolute right-10 top-10 z-20"
      >
        <div className="flex flex-col gap-1">
          <div className={`${line} ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`${line} ${open ? 'opacity-0' : ''}`} />
          <div
            className={`${line} ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </div>
      </div>
    )
  } else return <></>
}

export default Menu
