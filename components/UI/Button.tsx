const Button = ({ children }: { children: string }) => {
  return (
    <div className="bg-gray-800 text-white px-12 py-4 select-none">
      {children}
    </div>
  )
}

export default Button
