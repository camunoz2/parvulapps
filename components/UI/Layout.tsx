import Menu from './Menu'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import Logo from './Logo'
import Dashed from './Dashed'

const queryClient = new QueryClient()

const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <div className="container mx-auto px-6 text-dark">
      <div className="flex justify-between py-6">
        <Logo small />
        <div className="flex items-center gap-1">
          <p>Cerrar Sesión</p>
          <img src="/exit_icon.svg" alt="exit icon" className="w-4" />
        </div>
      </div>

      <Dashed />
      <div className="divide-y divide-dashed h-[1px] w-full" />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </div>
  )
}

export default Layout
