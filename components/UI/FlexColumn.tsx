interface Props {
  children: JSX.Element | JSX.Element[]
}

const FlexColumn = ({ children }: Props) => {
  return <div className="flex flex-col items-center gap-4">{children}</div>
}

export default FlexColumn
