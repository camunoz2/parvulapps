import Text from './Text'

interface Props {
  title: string
  bodyText: string
  children?: JSX.Element | JSX.Element[]
}

const SectionCard = ({ title, bodyText, children }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <Text>{bodyText}</Text>
      {children}
    </div>
  )
}

export default SectionCard
