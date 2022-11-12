const Logo = ({ small = false }) => {
  if (small) {
    return (
      <div className="relative flex flex-row flex-shrink-0 gap-2">
        <img src="/logo.svg" className="w-6" />
        <h1 className="text-xl font-bold">Parvulapps</h1>
        <p className="text-xs font-extralight">Ver. 0.1</p>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <img src="/logo.svg" className="w-10" />
      <h1 className="text-5xl font-bold">Parvulapps</h1>
      <p className="text-xs font-extralight">Ver. 0.1</p>
    </div>
  )
}

export default Logo
