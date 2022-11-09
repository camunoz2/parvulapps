import Menu from './Menu'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  return (
    <div className="container mx-auto">
      <Menu />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </div>
  )
}

export default Layout
