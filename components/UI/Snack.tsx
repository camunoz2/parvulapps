import { Classroom } from '@prisma/client'

interface Props {
  children: string
  editing?: boolean
}

const Snack = ({ children, editing }: Props) => {
  const deleteCourse = () => {}

  return (
    <div className="w-16 border border-gray-700 text-center flex items-center justify-around cursor-pointer">
      <div className="text-center">{children}</div>
    </div>
  )
}

export default Snack
