import Menu from './Menu'

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div>
      <Menu />
      {children}
    </div>
  )
}

export default Layout
