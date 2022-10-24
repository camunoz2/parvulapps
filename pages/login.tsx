import Head from 'next/head'
import { signIn } from 'next-auth/react'

import Button from '../components/UI/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Parvulapps | Login</title>
      </Head>
      <Layout>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FlexColumn>
            <Heading level={1}>Iniciar Sesion</Heading>
            <div
              onClick={() =>
                signIn('google', { callbackUrl: '/dashboard' })
              }
            >
              <Button>Ingresar con GMail</Button>
            </div>
          </FlexColumn>
        </div>
      </Layout>
    </>
  )
}

//TODO: Make a verification of email to institution mail check this: https://next-auth.js.org/providers/google

export default LoginPage
