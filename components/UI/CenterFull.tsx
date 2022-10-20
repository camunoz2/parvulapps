interface Props {
  children: JSX.Element | JSX.Element[]
}

const CenterFull = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center self-center w-screen h-screen">
      {children}
    </div>
  )
}

export default CenterFull
