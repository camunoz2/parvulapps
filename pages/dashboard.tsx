import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/UI/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'
import Separator from '../components/UI/Separator'

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>Parvulapps | Configuracion</title>
      </Head>
      <Layout>
        <CenterFull>
          <FlexColumn>
            <Heading level={3}>Bienvenida</Heading>
            <Heading level={1}>Maria Fernanda Belladares</Heading>
            <Separator gap={1} />
            <Heading level={4}>Que quieres hacer hoy?</Heading>
            <Button>Evaluar alumnos</Button>
            <Button>Ver Resultados</Button>
            <Button>Configuracion</Button>
            <Link href="/login">
              <a>
                <Button>Cerrar Sesion</Button>
              </a>
            </Link>
          </FlexColumn>
        </CenterFull>
      </Layout>
    </>
  )
}

export default DashboardPage
