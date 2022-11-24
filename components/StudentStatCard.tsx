interface Props {
  scores: number[]
  title: string
  index: number
}

const StudentStatCard = ({ scores, title, index }: Props) => {
  function getIsProgressing() {
    if (index === 0 || scores[index] === scores[index - 1]) return
    return scores[index] > scores[index - 1]
  }

  return (
    <div className="bg-white border border-accent/50 rounded-md shadow-custom py-5 px-10 grid grid-cols-3 items-center">
      <div className="col-span-2">
        <h3 className="text-xl">{title}</h3>
      </div>
      <div className="flex flex-col gap-1 text-right">
        <div className="col-span-1 text-2xl font-bold">
          {scores[index] + '%'}
        </div>

        <p
          className={`text-xs ${
            getIsProgressing() ? 'text-blue-500' : 'text-red-500'
          }`}
        >
          {scores[index] > scores[index - 1] ? '+' : '-'}
          {index !== 0
            ? Math.abs(scores[index] - scores[index - 1])
            : ''}
        </p>
      </div>
    </div>
  )
}

export default StudentStatCard
