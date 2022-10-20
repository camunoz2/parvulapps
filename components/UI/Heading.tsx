const Heading = ({ level, children }: { level: number; children: string }) => {
  switch (level) {
    case 1:
      return <h1 className="text-4xl font-bold text-gray-900">{children}</h1>
    case 2:
      return <h2 className="text-3xl text-gray-900">{children}</h2>
    case 3:
      return <h3 className="text-2xl text-gray-900">{children}</h3>
    case 4:
      return <h4 className="text-xl text-gray-900">{children}</h4>
    default:
      return <p className="bg-red-400">THIS HEADER MUST HAVE A LEVEL</p>
  }
}

export default Heading
