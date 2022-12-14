import Head from 'next/head'
import { useSession } from 'next-auth/react'

import Layout from '../components/UI/Layout'
import ModuleButton from '../components/UI/ModuleButton'
import { useRouter } from 'next/router'

const DashboardPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'unauthenticated') {
    router.replace('/login')
  }

  return (
    <>
      <Head>
        <title>Parvulapps | Configuracion</title>
      </Head>
      <div className="absolute top-0 left-0 w-full bg-[#F6FAFF] -z-10" />
      <Layout>
        <div className="flex flex-col gap-24 pt-32">
          <div>
            <p className="text-xl text-accent font-light">
              Bienvenid@
            </p>
            <h1 className="text-5xl font-bold">
              {session?.user?.name ? session.user.name : 'Profesor@'}
            </h1>
            <p>{session?.user?.email}</p>
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
