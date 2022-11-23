import { Grade } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import StudentCard from '../components/StudentCard'
import StudentStatCard from '../components/StudentStatCard'
import Layout from '../components/UI/Layout'

const Resultados = () => {
  const router = useRouter()
  const [grade, setGrade] = useState<number>()

  const gradeQuery = useQuery({
    queryKey: ['grades'],
    queryFn: getGrades,
  })

  function getGrades(): Promise<Grade[]> {
    return fetch('/api/get-grades', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  }

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login')
    },
  })

  return (
    <Layout>
      {/* Filter top bar */}
      <div className="flex flex-row gap-2 mt-4 items-end justify-between mb-6">
        <div className="flex gap-2">
          {/* Grade selector */}
          <div className="flex flex-col gap-2">
            <label className="italic font-light">Curso</label>
            {gradeQuery.isLoading ? (
              <p>Loading...</p>
            ) : (
              <select
                title="grade selector"
                onChange={(event) =>
                  setGrade(parseInt(event.target.value))
                }
                className="border border-accent rounded-md px-2 h-10"
              >
                {!grade && (
                  <option defaultChecked>Elije un curso</option>
                )}
                {gradeQuery.data?.map((grade) => {
                  return (
                    <option key={grade.id} value={grade.id}>
                      {grade.classroom} - {grade.section}
                    </option>
                  )
                })}
              </select>
            )}
          </div>
          {/* Search */}
          <div className="flex flex-col gap-2">
            <label className="italic font-light">Buscar Alumno</label>
            <input
              className="border border-accent rounded-md px-2 h-10"
              title="search"
              type="search"
            />
          </div>
        </div>

        <button className="bg-accent hover:cursor-pointer hover:shadow-md h-10 text-center px-4 rounded-md justify-self-end">
          Resultados totales
        </button>
      </div>
      {/* End of filter top bar */}

      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-2">
          <StudentCard />
        </div>
        <div className="col-span-5">
          <div className="flex justify-between my-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">Tatiana Quitzon</h2>
              <p className="text-sm italic font-light">Kinder</p>
            </div>
            <p className="font-bold italic">23.456.789-6</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StudentStatCard
              percentage="43%"
              title="Evaluación diagnóstica"
            />
            <StudentStatCard
              percentage="43%"
              title="Evaluación intermedia"
            />
            <StudentStatCard
              percentage="50%"
              title="Evaluación final"
              stat="+7%"
            />
          </div>

          <div className="mt-6">
            <h4 className="mb-4">
              Evaluaciones pendientes y completadas
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-md bg-white p-2 flex gap-2">
                <div className="w-12 h-12 rounded-md bg-slate-300"></div>
                <div>
                  <h6>Objetivos totales evaluados</h6>
                  <p className="text-xl font-bold">57/206</p>
                </div>
              </div>
              <div className="border rounded-md bg-white p-2 flex gap-2">
                <div className="w-12 h-12 rounded-md bg-slate-300"></div>
                <div>
                  <h6>
                    Objetivos de{' '}
                    <span className="text-accent font-bold underline decoration-blue-700">
                      Nivel 1
                    </span>{' '}
                    evaluados
                  </h6>
                  <p className="text-xl font-bold">57/206</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Resultados
