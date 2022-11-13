import Menu from './Menu'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import Logo from './Logo'
import Dashed from './Dashed'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/login' && status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status])

  return (
    <div className="container mx-auto px-6 text-dark h-screen">
      <div className="flex justify-between py-6">
        <Logo small />

        {status === 'authenticated' && (
          <div
            onClick={() => signOut()}
            className="flex items-center gap-1"
          >
            <p>Cerrar Sesión</p>
            <img
              src="/exit_icon.svg"
              alt="exit icon"
              className="w-4"
            />
          </div>
        )}
      </div>

      <Dashed />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </div>
  )
}

export default Layout
