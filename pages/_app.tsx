import { SessionProvider } from 'next-auth/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import type { AppProps } from 'next/app'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp
