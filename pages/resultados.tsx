import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ResultsTable from '../components/ResultsTable'
import Layout from '../components/UI/Layout'

const Resultados = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  const [currentTab, setCurrentTab] = useState(0)
  const tabs = [
    'Resultados total por nucleo',
    'Estadística de desempeño anual',
    'Estadística detallada por alumno',
  ]

  return (
    <Layout>
      <h2 className="lg:hidden">
        Vista solo disponible en una pantalla con una resolución mayor
      </h2>
      <div className="hidden gap-2 lg:flex">
        {tabs.map((t, index) => {
          return (
            <div
              key={index}
              className="hover:bg-accent px-2 py-4 rounded-t-md border-t border-accent bg-slate-100"
              onClick={() => setCurrentTab(index)}
            >
              {t}
            </div>
          )
        })}
      </div>
      <div className="hidden gap-2 lg:flex">
        {currentTab === 0 && <ResultsTable />}
        {currentTab === 1 && (
          <p>
            Pronto... si tinen alguna sugerencia la pueden realizar al
            mail camunoz2@gmail.com
          </p>
        )}
        {currentTab === 2 && (
          <p>
            Pronto... si tinen alguna sugerencia la pueden realizar al
            mail camunoz2@gmail.com
          </p>
        )}
      </div>
    </Layout>
  )
}

export default Resultados
