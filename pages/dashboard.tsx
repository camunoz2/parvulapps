import Head from 'next/head'
import { useSession, signOut } from 'next-auth/react'

import Button from '../components/UI/Button'
import CenterFull from '../components/UI/CenterFull'
import FlexColumn from '../components/UI/FlexColumn'
import Heading from '../components/UI/Heading'
import Layout from '../components/UI/Layout'
import Separator from '../components/UI/Separator'
import Link from 'next/link'
import ModuleButton from '../components/UI/ModuleButton'

const DashboardPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Parvulapps | Configuracion</title>
      </Head>
      <div className="absolute top-0 left-0 w-full bg-[#F6FAFF] -z-10" />
      <Layout>
        <div className="flex flex-col gap-24 h-screen py-32">
          <div>
            <p className="text-xl text-accent font-light">
              Bienvenid@
            </p>
            <h1 className="text-5xl font-bold">
              {session?.user?.name ? session.user.name : 'Profesor@'}
            </h1>
          </div>

          <div className="flex gap-2">
            <ModuleButton
              img="/eval_icon.svg"
              text="Evaluar"
              link="/evaluar"
            />
            <ModuleButton
              img="/book_icon.svg"
              text="Ver Resultados"
              link="/resultados"
            />
            <ModuleButton
              img="/add_people_icon.svg"
              text="Configurar"
              link="/configurar"
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default DashboardPage
