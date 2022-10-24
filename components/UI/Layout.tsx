import Menu from './Menu'

const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <div className="mt-24 container mx-auto">
      <Menu />
      {children}
    </div>
  )
}

export default Layout
