const Button = ({
  children,
  handleClick,
}: {
  children: string
  handleClick?: () => void
}) => {
  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 text-white px-12 py-4 select-none text-center cursor-pointer"
    >
      {children}
    </div>
  )
}

export default Button
