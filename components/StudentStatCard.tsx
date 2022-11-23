interface Props {
  percentage: string
  title: string
  stat?: string
}

const StudentStatCard = ({ percentage, title, stat }: Props) => {
  return (
    <div className="bg-white border border-accent/50 rounded-md shadow-custom py-5 px-10 grid grid-cols-3 items-center">
      <div className="col-span-2">
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="flex flex-col gap-1 text-right">
        <div className="col-span-1 text-2xl font-bold">
          {percentage}
        </div>
        <p className="text-xs text-blue-500">{stat}</p>
      </div>
    </div>
  )
}

export default StudentStatCard
