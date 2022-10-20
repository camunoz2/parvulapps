const Button = ({ children }: { children: string }) => {
  return (
    <button className="bg-gray-800 text-white px-12 py-4">{children}</button>
  )
}

export default Button
