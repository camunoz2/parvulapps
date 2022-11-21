import Link from 'next/link'

const Logo = ({ small = false, linked = false }) => {
  if (small) {
    return (
      <Link href={linked ? '/dashboard' : ''}>
        <div className="relative flex flex-row flex-shrink-0 gap-2 hover:cursor-pointer">
          <img alt="" src="/logo.svg" className="w-6" />
          <h1 className="text-xl font-bold">Parvulapps</h1>
          <p className="text-xs font-extralight">Ver. 0.1</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={linked ? '/dashboard' : ''}>
      <div className="flex gap-2">
        <img
          alt=""
          src="/logo.svg"
          className="w-10 hover:cursor-pointer"
        />
        <h1 className="text-5xl font-bold">Parvulapps</h1>
        <p className="text-xs font-extralight">Ver. 0.1</p>
      </div>
    </Link>
  )
}

export default Logo
