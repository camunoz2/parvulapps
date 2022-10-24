interface Props {
  children: JSX.Element | JSX.Element[]
}

const CenterFull = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      {children}
    </div>
  )
}

export default CenterFull
