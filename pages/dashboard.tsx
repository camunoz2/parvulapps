import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

import Button from '../components/UI/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'
import Separator from '../components/UI/Separator'
import Link from 'next/link'

const DashboardPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Parvulapps | Configuracion</title>
      </Head>
      <Layout>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FlexColumn>
            <Heading level={3}>Bienvenid@</Heading>
            <Heading level={1}>
              {session?.user?.name ? session.user.name : 'Profesor@'}
            </Heading>
            <Separator gap={1} />
            <Heading level={4}>Que quieres hacer hoy?</Heading>
            <Link href="/evaluar">
              <a>
                <Button>Evaluar alumnos</Button>
              </a>
            </Link>
            <Button>Ver Resultados</Button>
            <Link href="/configurar">
              <a>
                <Button>Configuracion</Button>
              </a>
            </Link>
            <div onClick={() => signOut({ callbackUrl: '/login' })}>
              <Button>Cerrar Sesion</Button>
            </div>
          </FlexColumn>
        </div>
      </Layout>
    </>
  )
}

export default DashboardPage
