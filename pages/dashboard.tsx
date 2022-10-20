import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

import Button from '../components/UI/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'
import Separator from '../components/UI/Separator'

const DashboardPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Parvulapps | Configuracion</title>
      </Head>
      <Layout>
        <CenterFull>
          <FlexColumn>
            <Heading level={3}>Bienvenid@</Heading>
            <Heading level={1}>
              {session?.user?.name ? session.user.name : 'Profesor@'}
            </Heading>
            <Separator gap={1} />
            <Heading level={4}>Que quieres hacer hoy?</Heading>
            <Button>Evaluar alumnos</Button>
            <Button>Ver Resultados</Button>
            <Button>Configuracion</Button>
            <div onClick={() => signOut({ callbackUrl: '/login' })}>
              <Button>Cerrar Sesion</Button>
            </div>
          </FlexColumn>
        </CenterFull>
      </Layout>
    </>
  )
}

export default DashboardPage
