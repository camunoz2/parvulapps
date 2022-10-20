import Head from 'next/head'
import Link from 'next/link'
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
        <CenterFull>
          <FlexColumn>
            <Heading level={1}>Iniciar Sesion</Heading>
            <Link href="/dashboard">
              <a>
                <Button>Ingresar con GMail</Button>
              </a>
            </Link>
          </FlexColumn>
        </CenterFull>
      </Layout>
    </>
  )
}

//TODO: Make a verification of email to institution mail check this: https://next-auth.js.org/providers/google

export default LoginPage
