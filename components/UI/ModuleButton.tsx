import Link from 'next/link'

const ModuleButton = ({
  text,
  link,
  img,
}: {
  text: string
  link: string
  img: string
}) => {
  return (
    <Link href={link}>
      <div className="w-32 h-32 bg-accent flex flex-col items-center justify-center gap-2 rounded-md hover:bg-green-500 hover:cursor-pointer">
        <img src={img} className="h-8" alt={`${text} icon`} />
        <p className="text-sm font-bold text-center">{text}</p>
      </div>
    </Link>
  )
}

export default ModuleButton
