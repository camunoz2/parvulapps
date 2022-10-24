const Snack = ({ children }: { children: string }) => {
  return (
    <div className="w-16 border border-gray-700 text-center">
      {children}
    </div>
  )
}

export default Snack
