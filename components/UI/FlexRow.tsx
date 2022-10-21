interface Props {
  children: JSX.Element | JSX.Element[]
}

const FlexColumn = ({ children }: Props) => {
  return <div className="flex flex-row gap-4">{children}</div>
}

export default FlexColumn
