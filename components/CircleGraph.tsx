interface Props {
  title: string
  score: () => number
}

const CircleGraph = ({ title, score }: Props) => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
        <p className="font-bold italic">{score() + '%'}</p>
      </div>
      <p className="text-center text-sm font-light italic">{title}</p>
    </div>
  )
}

export default CircleGraph
